import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDIEtCfoSgt-Ka56fFwouFDvEXId0Xrk78",
    authDomain: "scan-a-lot.firebaseapp.com",
    projectId: "scan-a-lot",
    storageBucket: "scan-a-lot.appspot.com",
    messagingSenderId: "816922417821",
    appId: "1:816922417821:web:ba0a3811f84a8cbbacd274",
    measurementId: "G-LVFHL8LFNV"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

var arrOfficers = [];
//Get Firestore Officers Collection
const querySnapshotOfficers = await getDocs(collection(db, "Officers"))
querySnapshotOfficers.forEach((doc) => {
  arrOfficers.push(doc.data());
});

// When the User Clicks add Officer Popup Form Appears
function addPopups(strTableAddType) {
    let popup = document.getElementById(strTableAddType);
    popup.classList.add("show");
};

// Popup Add Vehicle Button Clicked
function createVehicle() {
    //Close Popup
    let popup = document.getElementById("addVehiclePopup");
    popup.classList.remove("show");
};

// Closes Vehicle Table
function closeVehicle() {
    let popup = document.getElementById("addVehiclePopup");
    //reset table values
    
    popup.classList.remove("show");
}

// Popup Add Officer Button Clicked
async function createOfficer() {
    //Get letiabletOfficerBody
    let strFirstName = String(document.getElementById("firstName").value);
    let strLastName = String(document.getElementById("lastName").value);
    let strEmail = String(document.getElementById("email").value);
    let strPassword = String(document.getElementById("password").value);
    let strPasswordConfirm = String(document.getElementById("password2").value);

    //Check If Password Meets Requirements 
    //Meets Lengeth Requirements
    if (strPassword.length < 8){
        //Alert User of Pasword Not Meeting Requirements
        let warningMessage = document.getElementById("popupOfficerWarning");
        warningMessage.innerHTML = "Passwords Require 8 Chracters";
        return
    }
    
    //Test if password has it is a capital, lower case or numeric value
    let capLetter = true;
    let lowerLetter = true;
    let numeric = true;
    if (Boolean(strPassword.match(/[A-Z]/))) capLetter = false;
    if (Boolean(strPassword.match(/[a-z]/))) lowerLetter = false;
    if (Boolean(strPassword.match(/[0-9]/))) numeric = false

    if (capLetter || lowerLetter || numeric){
        //Alert User of Pasword Not Meeting Requirements
        let warningMessage = document.getElementById("popupOfficerWarning");
        warningMessage.innerHTML = "Password Does Not Meet Requirements: Provide at least one capital letter, one lower case letter and one number";
        return
    }

    //Check If Password Match
    if (strPassword != strPasswordConfirm){
        //Alert User of Non Matching Passwords
        let warningMessage = document.getElementById("popupOfficerWarning");
        warningMessage.innerHTML = "Password Fields Do Not Match";
        return
    }

    //Create New Firebase Authentication Account
    createUserWithEmailAndPassword(auth, strEmail, strPassword);


    //Create new officer to FireStore
    var strDocName;
    if (arrOfficers[arrOfficers.length - 1].OfficerID + 1 < 10){
        strDocName = "Off00" + String(arrOfficers[arrOfficers.length - 1].OfficerID + 1);
    }else if(arrOfficers[arrOfficers.length - 1].OfficerID + 1 < 100){
        strDocName = "Off0" + String(arrOfficers[arrOfficers.length - 1].OfficerID + 1);
    }else{
        strDocName = "Off" + String(arrOfficers[arrOfficers.length - 1].OfficerID + 1);
    }
    await setDoc(doc(db, "Officers", strDocName), {
        OfficerID: arrOfficers[arrOfficers.length - 1].OfficerID + 1,
        FirstName: strFirstName,
        LastName: strLastName,
        Email: strEmail,
        UserName: strLastName + strFirstName.charAt(0)
    });

    //Clear Values
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password2").value = "";

    //Close Popup
    let popup = document.getElementById("addOfficerPopup");
    popup.classList.remove("show");
}

// Closes Officer Table
function closeOfficer() {
    let popup = document.getElementById("addOfficerPopup");
    //reset table values
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password2").value = "";
    popup.classList.remove("show");
}

// Popup Add Parking Lot Button Clicked
function createLot() {
    //Close Popup
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
function createOffense() {
    //Close Popup
    let popup = document.getElementById("addOffensePopup");
    popup.classList.remove("show");
}

// Closes Offense Table
function closeOffense() {
    let popup = document.getElementById("addOffensePopup");
    //reset table values
    
    popup.classList.remove("show");
}

//Button Clickers In DataTable
addOfficerButton.addEventListener('click', function(){
    addPopups("addOfficerPopup");
}, false);
popupOfficerUpdateButton.addEventListener('click', createOfficer)
popupOfficerCancel.addEventListener('click', closeOfficer)