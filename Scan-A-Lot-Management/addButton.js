import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { arrOfficers, arrLots, arrVehicles } from "./FireBaseCollection.js"; 

const firebaseConfig = {
    apiKey: "AIzaSyDIEtCfoSgt-Ka56fFwouFDvEXId0Xrk78",
    authDomain: "scan-a-lot.firebaseapp.com",
    projectId: "scan-a-lot",
    storageBucket: "scan-a-lot.appspot.com",
    messagingSenderId: "816922417821",
    appId: "1:816922417821:web:ba0a3811f84a8cbbacd274",
    measurementId: "G-LVFHL8LFNV"
  };

const auth = getAuth();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Corrdinate Values for map
let maxLongitude;
let maxLatitude;
let minLongitude;
let minLatitude;

// When The User Clicks Add button Popup Form Appears
function addPopups(strTableAddType) {
    let popup = document.getElementById(strTableAddType);
    popup.classList.add("show");
};

// Popup Add Vehicle Button Clicked
async function createVehicle() {
    //Get Form Inputs
    let strVehicleFirstName = String(document.getElementById("vehicleFirstName").value);
    let strVehicleLastName = String(document.getElementById("vehicleLastName").value);
    let strLicenseNum = String(document.getElementById("licenseNumber").value);
    let strLicenseState = String(document.getElementById("licenseState").value);
    let strVehicleMake = String(document.getElementById("vehicleMake").value);
    let strVehicleModel = String(document.getElementById("vehicleModel").value);
    let strVehicleColor = String(document.getElementById("vehicleColor").value);
    let arrAuthLots = [];
    for (var option of document.getElementById("allowLots").options)
    {
        if (option.selected) {
            arrAuthLots.push(option.value);
        }
    }

    //Require a First Name Value
    if (strVehicleFirstName == ""){
        document.getElementById("popupVehicleWarning").innerHTML = "Provide A First Name Value";
        return;
    }

    //Require a Last Name Value
    if (strVehicleLastName == ""){
        document.getElementById("popupVehicleWarning").innerHTML = "Provide A Last Name Value";
        return;
    }
    
    //Make sure plate is a at least 2 characters and no more than 8 otherswise send warning
    if(strLicenseNum < 2 || strLicenseNum > 8){
        document.getElementById("popupVehicleWarning").innerHTML = "License Plate Bad Format. License plates have 2 more more values but less than 9";
        return;
    }
    
    //Require a State Name Value
    if (strLicenseState == "--Please choose an option--"){
        document.getElementById("popupVehicleWarning").innerHTML = "Provide A License State Value";
        return;
    }

    //Require a Vehicle Make Value
    if (strVehicleMake == ""){
        document.getElementById("popupVehicleWarning").innerHTML = "Provide A Car Make Value";
        return;
    }

    //Require a Vehicle Model Value
    if (strVehicleModel == ""){
        document.getElementById("popupVehicleWarning").innerHTML = "Provide A Car Model Value";
        return;
    }

    //Require a Vehicle Color Value
    if (strVehicleColor == ""){
        document.getElementById("popupVehicleWarning").innerHTML = "Provide A Car Color Value";
        return;
    }

    //Create new Vehicle to fireStore
    //What is the largest ID number
    let strHighestID = parseInt(arrVehicles[0].IDNum);
    for(let iVehicleIndex = 1; iVehicleIndex < arrVehicles.length; iVehicleIndex++){
        if(strHighestID < arrVehicles[iVehicleIndex].IDNum){
            strHighestID = parseInt(arrVehicles[iVehicleIndex].IDNum);
        }
    }
    strHighestID++;

    //Create Next Document Name
    let strDocName = ""
    if (strHighestID < 10){
        strDocName = String("Veh00" + String(strHighestID));
    }else if(strHighestID < 100){
        strDocName = String("Veh0" + String(strHighestID));
    }else{
        strDocName = String("Veh" + String(strHighestID));
    }
     //Create new Document to Vehicles Collection
     await setDoc(doc(db, "Vehicles", strDocName), {
        IDNum: strDocName.substring(3,),
        OwnerFirstName: strVehicleFirstName,
        OwnerLastName: strVehicleLastName,
        LicenseNum: strLicenseNum,
        LicenseState: strLicenseState,
        Make: strVehicleMake,
        Model: strVehicleModel,
        Color: strVehicleColor,
        ParkingLot: arrAuthLots
    });

    //close popup
    document.getElementById("vehicleFirstName").value = "";
    document.getElementById("vehicleLastName").value = "";
    document.getElementById("licenseNumber").value = "";
    document.getElementById("licenseState").value = "--Please choose an option--";
    document.getElementById("vehicleMake").value = "";
    document.getElementById("vehicleModel").value = "";
    document.getElementById("vehicleColor").value = "";
    while (document.getElementById("allowLots").firstChild) {
        document.getElementById("allowLots").removeChild(document.getElementById("allowLots").firstChild);
    }
    document.getElementById("popupVehicleWarning").value = "";
    let popup = document.getElementById("addVehiclePopup");
    popup.classList.remove("show");
};

// Closes Vehicle Table
function closeVehicle() {
    let popup = document.getElementById("addVehiclePopup");
    //reset table values
    document.getElementById("vehicleFirstName").value = "";
    document.getElementById("vehicleLastName").value = "";
    document.getElementById("licenseNumber").value = "";
    document.getElementById("licenseState").value = "--Please choose an option--";
    document.getElementById("vehicleMake").value = "";
    document.getElementById("vehicleModel").value = "";
    document.getElementById("vehicleColor").value = "";
    while (document.getElementById("allowLots").firstChild) {
        document.getElementById("allowLots").removeChild(document.getElementById("allowLots").firstChild);
    }
    document.getElementById("popupVehicleWarning").value = "";
    popup.classList.remove("show");
}

// Popup Add Officer Button Clicked Check Values And Add An Officer To Database
async function createOfficer() {
    let strFirstName = String(document.getElementById("firstName").value);
    let strLastName = String(document.getElementById("lastName").value);
    let strEmail = String(document.getElementById("email").value);
    let strPassword = String(document.getElementById("password").value);
    let strPasswordConfirm = String(document.getElementById("password2").value);

    //Check if password meets requirements 
    //Meets length requirements
    if (strPassword.length < 8){
        //Alert user of password not meeting requirements
        let warningMessage = document.getElementById("popupOfficerWarning");
        warningMessage.innerHTML = "Passwords Require 8 Chracters";
        return
    }
    
    //Test if password has a capital, lower case or numeric value
    let isCapLetter = true;
    let isLowerLetter = true;
    let isNumeric = true;
    if (Boolean(strPassword.match(/[A-Z]/))) isCapLetter = false;
    if (Boolean(strPassword.match(/[a-z]/))) isLowerLetter = false;
    if (Boolean(strPassword.match(/[0-9]/))) isNumeric = false

    if (isCapLetter || isLowerLetter || isNumeric){
        //Alert user of password not meeting requirements
        let warningMessage = document.getElementById("popupOfficerWarning");
        warningMessage.innerHTML = "Password Does Not Meet Requirements: Provide at least one capital letter, one lower case letter and one number";
        return
    }

    //Check if password match
    if (strPassword != strPasswordConfirm){
        //Alert user of non matching passwords
        let warningMessage = document.getElementById("popupOfficerWarning");
        warningMessage.innerHTML = "Password Fields Do Not Match";
        return
    }

    //Create new firebase authentication account
    createUserWithEmailAndPassword(auth, strEmail, strPassword);

    //Determine Document ID
    //What is the largest ID number
    let strHighestID = parseInt(arrOfficers[0].OfficerID);
    for(let iOfficerIndex = 1; iOfficerIndex < arrOfficers.length; iOfficerIndex++){
        if(strHighestID < arrOfficers[iOfficerIndex].OfficerID){
            strHighestID = parseInt(arrOfficers[iOfficerIndex].OfficerID);
        }
    }
    strHighestID++;

    //Create Next Document Name
    let strDocName = ""
    if (strHighestID < 10){
        strDocName = "Off00" + String(strHighestID);
    }else if(strHighestID < 100){
        strDocName = "Off0" + String(strHighestID);
    }else{
        strDocName = "Off" + String(strHighestID);
    }
    
    //Create new Document to Officers Collection
    await setDoc(doc(db, "Officers", strDocName), {
        OfficerID: arrOfficers[arrOfficers.length - 1].OfficerID + 1,
        FirstName: strFirstName,
        LastName: strLastName,
        Email: strEmail,
        Username: strLastName + strFirstName.charAt(0)
    });

    //Clear values
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password2").value = "";
    document.getElementById("popupOfficerWarning").value = "";

    //Close popup
    let popup = document.getElementById("addOfficerPopup");
    popup.classList.remove("show");
}

// Closes Officer Table
function closeOfficer() {
    let popup = document.getElementById("addOfficerPopup");
    //Reset table values
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password2").value = "";
    document.getElementById("popupOfficerWarning").value = "";
    popup.classList.remove("show");
}

// Popup Add Parking Lot Button Clicked Adds A New Parking Lot To The Database
async function createLots() {
    //Get Values
    let strLotName = String(document.getElementById("lotName").value);


    //If values are empty error is sent
    if (strLotName == ""){
        let warningMessage = document.getElementById("popupLotWarning");
        warningMessage.innerHTML = "No Lot Name Given";
        return
    }

    //If two marker are not selected on the map provide error
    if (minLongitude == null){
        let warningMessage = document.getElementById("popupLotWarning");
        warningMessage.innerHTML = "Mapping Requires Two Markers";
        return
    }


    //reset table values
    document.getElementById("lotName").value = "";
    document.getElementById("longitudeVals").innerHTML = "";
    document.getElementById("latitudeVals").innerHTML = "";
    document.getElementById("popupLotWarning").innerHTML = "";

    //Close popup
    let popup = document.getElementById("addLotsPopup");
    popup.classList.remove("show");
}

// Closes Parking Lot Table
function closeLots() {
    let popup = document.getElementById("addLotsPopup");
    //reset table values
    document.getElementById("lotName").value = "";
    document.getElementById("longitudeVals").innerHTML = "";
    document.getElementById("latitudeVals").innerHTML = "";
    document.getElementById("popupLotWarning").innerHTML = "";

    popup.classList.remove("show");
}

// Popup Add Offense Button Clicked
async function createOffense() {
    //Set input variables
    let strOffenseType = String(document.getElementById("offenseType").value);
    let strCurencyType = String(document.getElementById("currencyType").value);
    let strFineAmount = String(document.getElementById("fineAmount").value);

    //If values are empty error is sent
    if (strOffenseType == ""){
        let warningMessage = document.getElementById("popupOffenseWarning");
        warningMessage.innerHTML = "No Offense Type Given";
        return
    }
    if (strCurencyType == "--Please choose an option--"){
        let warningMessage = document.getElementById("popupOffenseWarning");
        warningMessage.innerHTML = "No Currency Type Provided";
        return;
    }
    if (strFineAmount == ""){
        let warningMessage = document.getElementById("popupOffenseWarning");
        warningMessage.innerHTML = "No Fine Amount Provided";
        return;
    }

    //Get rid of possible commas
    strFineAmount = strFineAmount.replace(/\,/g, '');

    //If user provided a currency symbol for fine amount check if matches remove for future testing
    if(strFineAmount.charAt(0) == strCurencyType){
        strFineAmount = strFineAmount.slice(1);
    }

    //Fine amount requirement check
    const numCheckIfNumber = +strFineAmount;
    if(Number.isNaN(numCheckIfNumber)){
        let warningMessage = document.getElementById("popupOffenseWarning");
        warningMessage.innerHTML = "Fine Amount Is Not A Number Value";
        return;
    }

    //Add to firestore
    await setDoc(doc(db, "Offenses", strOffenseType.replace(/\s/g, '')), {
        OffenseType: strOffenseType,
        FineAmount: strCurencyType + strFineAmount
    });

    //Reset table values
    document.getElementById("offenseType").value = "";
    document.getElementById("currencyType").value = "--Please choose an option--";
    document.getElementById("fineAmount").value = "";
    document.getElementById("popupOfficerWarning").value = "";

    //Close popup
    let popup = document.getElementById("addOffensePopup");
    popup.classList.remove("show");
}

// Closes Offense Table
function closeOffense() {
    let popup = document.getElementById("addOffensePopup");
    //reset table values
    document.getElementById("offenseType").value = "";
    document.getElementById("currencyType").value = "--Please choose an option--";
    document.getElementById("fineAmount").value = "";
    document.getElementById("popupOffenseWarning").value = "";
    popup.classList.remove("show");
}

//Button Clickers For Vehicle Add Button
addVehicleButton.addEventListener('click', function(){
    addPopups("addVehiclePopup");
    //Add Authorized Lots in the parking lot dropdown
    const allowLotsDropDown = document.getElementById("allowLots");
    //Loop Parking Lots as option in drop down
    for (let iDropDownIndex = 0; iDropDownIndex < arrLots.length; iDropDownIndex++){
        let option = document.createElement("option");
        option.setAttribute("value", arrLots.at(iDropDownIndex).LotName);

        let optionText = document.createTextNode(arrLots.at(iDropDownIndex).LotName);
        option.appendChild(optionText);

        allowLotsDropDown.appendChild(option);
    }
});
//Create Vehicle Button
popupVehicleUpdateButton.addEventListener('click', createVehicle)
//Cancel Vehicle Button Creation
popupVehicleCancel.addEventListener('click', closeVehicle)

//Button Clickers For Officer Add Button
addOfficerButton.addEventListener('click', function(){
    addPopups("addOfficerPopup");
});
//Create Officer Button
popupOfficerUpdateButton.addEventListener('click', createOfficer)
//Cancel Officer Button Creation
popupOfficerCancel.addEventListener('click', closeOfficer)

//Button Clickers For Parking Lots Add Button
addLotsButton.addEventListener('click', function(){
    //null corrdinate min/max values
    maxLongitude = null;
    maxLatitude = null;
    minLongitude = null;
    minLatitude = null;
    
    createMap();
    addPopups("addLotsPopup");
});
//Create Parking Lots Button
popupLotsUpdateButton.addEventListener('click', createLots)
//Cancel Parking Lots Button Creation
popupLotsCancel.addEventListener('click', closeLots)

//Button Clickers For Offense Add Buttone
addOffenseButton.addEventListener('click', function(){
    addPopups("addOffensePopup");
});
//Create Offense Button
popupOffenseUpdateButton.addEventListener('click', createOffense)
//Cancel Offense Button Creation
popupOffenseCancel.addEventListener('click', closeOffense)


//Get Current Location Code
const location = { lat: -79.400219, lng: 40.292449 };
const successCallback = (position) => {
    console.log(position.coords);
    location.lat = position.coords.latitude
    location.lng = position.coords.longitude
  };  
const errorCallback = (error) => {
    console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

//Code To Get Map Object
//TomTom map connection
function createMap(){
    let position1;
    let position2;
    let lotMarker1
    let lotMarker2
    
    let map = tt.map({
        container: 'map',
        key: 'bAuwCtTRl1XJEQYW9RHosFLKrJ3PD2rJ',
        center: location,
        zoom: 15,
        style: 'mapstyle.json'
    })

    //Creates marker
    function createLotMarker(markerCoordinates) {
        const lotMarkerElement = document.createElement("div")
        lotMarkerElement.innerHTML = "<img src='Images/mapPoint.webp' style='width: 30px; height: 30px';>"
        return new tt.Marker({ element: lotMarkerElement })
          .setLngLat(markerCoordinates)
          .addTo(map)
      }

    //Shows markers on map
    function drawLotMarkerOnMap(geoResponse) {
        if (
            geoResponse &&
            geoResponse.addresses &&
            geoResponse.addresses[0].address.freeformAddress
        ) {
            lotMarker2 = createLotMarker(
            geoResponse.addresses[0].position)
        }
    }

    //Map markers appear on click
    map.on("click", function (event) {
        //Remove marker if two exist
        if (lotMarker1 != null){
            lotMarker1.remove();
            position1 = null;
        }
        if (lotMarker2 != null){
            lotMarker1 = lotMarker2;
            position1 = position2;
        }
        const position = event.lngLat;
        position2 = position;
        tt.services.reverseGeocode({
            key: 'bAuwCtTRl1XJEQYW9RHosFLKrJ3PD2rJ',
            position: position,
        })
        .then(function (results) {
            drawLotMarkerOnMap(results);
        })
        sortCorrdinates();
    })

    //Sorts positions and gives corrdinate values to find max/min of longitude and latitude back in the popup
    function sortCorrdinates(){
        //If there is only one position is give
        if(position1 == null){
            maxLongitude = position2.lng;
            maxLatitude = position2.lat;
            document.getElementById("longitudeVals").innerHTML = maxLongitude + " / No Value";
            document.getElementById("latitudeVals").innerHTML = maxLatitude + " / No Value";
            return;
        }

        //Find the max and min of longitude
        if(position1.lng > position2.lng){
            maxLongitude = position1.lng;
            minLongitude = position2.lng;
        }else{
            maxLongitude = position2.lng;
            minLongitude = position1.lng;
        }

        //Find the max min of latitude
        if(position1.lat > position2.lat){
            maxLatitude = position1.lat;
            minLatitude = position2.lat;
        }else{
            maxLatitude = position2.lng;
            minLatitude = position1.lng;
        }

        //Show screen results
        document.getElementById("longitudeVals").innerHTML = maxLongitude + " / " + minLongitude;
        document.getElementById("latitudeVals").innerHTML = maxLatitude + " / " + minLatitude;
    }
}