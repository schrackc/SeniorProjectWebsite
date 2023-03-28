import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { arrOfficers, arrLots } from "./FireBaseCollection.js"; 

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

// When The User Clicks Add Officer Popup Form Appears
function addPopups(strTableAddType) {
    let popup = document.getElementById(strTableAddType);
    popup.classList.add("show");
};

// Popup Add Vehicle Button Clicked
function createVehicle() {
    //close popup
    let popup = document.getElementById("addVehiclePopup");
    popup.classList.remove("show");
};

// Closes Vehicle Table
function closeVehicle() {
    let popup = document.getElementById("addVehiclePopup");
    //reset table values
    
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
    
    //Test if password has it is a capital, lower case or numeric value
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


    //Create new officer to fireStore
    //Determine Document ID
    var strDocName;
    if (arrOfficers[arrOfficers.length - 1].OfficerID + 1 < 10){
        strDocName = "Off00" + String(arrOfficers[arrOfficers.length - 1].OfficerID + 1);
    }else if(arrOfficers[arrOfficers.length - 1].OfficerID + 1 < 100){
        strDocName = "Off0" + String(arrOfficers[arrOfficers.length - 1].OfficerID + 1);
    }else{
        strDocName = "Off" + String(arrOfficers[arrOfficers.length - 1].OfficerID + 1);
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
function createLot() {
    //Close popup
    let popup = document.getElementById("addLotPopup");
    popup.classList.remove("show");
}

// Closes Parking Lot Table
function closeLot() {
    let popup = document.getElementById("addLotPopup");
    //reset table values
    
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
    const allowLotsDropDown = document.getElementById("allowLots")
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

//Button Clickers For Offense Add Buttone
addOffenseButton.addEventListener('click', function(){
    addPopups("addOffensePopup");
});
//Create Offense Button
popupOffenseUpdateButton.addEventListener('click', createOffense)
//Cancel Offense Button Creation
popupOffenseCancel.addEventListener('click', closeOffense)

//Allows mutliple select without holding down ctrl
const multiSelectWithoutCtrl = ( elemSelector ) => {
    let options = [].slice.call(document.querySelectorAll(`${elemSelector} option`));
    options.forEach(function (element) {
        element.addEventListener("mousedown", 
            function (e) {
                e.preventDefault();
                element.parentElement.focus();
                this.selected = !this.selected;
                return false;
            }, false );
    });
  }
  
  multiSelectWithoutCtrl('#allowLots')