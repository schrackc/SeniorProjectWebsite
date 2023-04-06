//This will be the collection for Officers. Will make a new JS file unique for each other table. 
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDIEtCfoSgt-Ka56fFwouFDvEXId0Xrk78",
  authDomain: "scan-a-lot.firebaseapp.com",
  projectId: "scan-a-lot",
  storageBucket: "scan-a-lot.appspot.com",
  messagingSenderId: "816922417821",
  appId: "1:816922417821:web:ba0a3811f84a8cbbacd274",
  measurementId: "G-LVFHL8LFNV"
};

//If firebase connection is not initialized initialize it
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 
//List of firestore collections
var arrTickets = [];
var arrVehicles = [];
var arrOfficers = [];
var arrOffenses = [];
var arrLots = []

//Get Firestore Officers Collection
const querySnapshotTickets = await getDocs(collection(db, "Tickets"))
querySnapshotTickets.forEach((doc) => {
  arrTickets.push(doc.data());
});
//Get Firestore Officers Collection
const querySnapshotVehicles = await getDocs(collection(db, "Vehicles"))
querySnapshotVehicles.forEach((doc) => {
  arrVehicles.push(doc.data());
});
//Get Firestore Officers Collection
const querySnapshotOfficers = await getDocs(collection(db, "Officers"))
querySnapshotOfficers.forEach((doc) => {
  arrOfficers.push(doc.data());
});

//Get Firestore Offenses Collection
const querySnapshotLots = await getDocs(collection(db, "ParkingLots"))
querySnapshotLots.forEach((doc) => {
  arrLots.push(doc.data());
});

//Get Firestore Offenses Collection
const querySnapshotOffenses = await getDocs(collection(db, "Offenses"))
querySnapshotOffenses.forEach((doc) => {
  arrOffenses.push(doc.data());
});
        

      
//Creates all the tables in the database
function getAllDataOnce(){
  //Tickets
  AddAllItemsToTheTicketsTable(arrTickets);
  //Vehicles
  AddAllItemsToTheVehiclesTable(arrVehicles);
  //Officers 
  AddAllItemsToTheOfficerTable(arrOfficers);
  //ParkingLots
  AddAllItemsToTheParkingLotsTable(arrLots);
  //Offenses
  AddAllItemsToTheOffensesTable(arrOffenses);
}

//filling the table
var offNo = 0;
var tTicketsbody = document.getElementById("tTicketBody");
var tVehiclesbody = document.getElementById("tVehiclesBody");
var tOfficerbody = document.getElementById("tOfficersBody");
var tParkingLotsbody = document.getElementById("tParkingLotsBody");
var tOffensesbody = document.getElementById("tOffensesBody");

//Adding Officer Data to table
function AddItemToOfficerTable(strLastName, strFirstName, strUsername, strEmail){
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');

  
  td1.innerHTML = strLastName;
  td2.innerHTML = strFirstName;
  td3.innerHTML = strUsername;
  td4.innerHTML = strEmail;

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);

  tOfficerbody.appendChild(trow);
}
//Creating the tables for Officer
function AddAllItemsToTheOfficerTable(OfficerDocList){
  offNo=0;
  tOfficerbody.innerHTML="";
  //Asking for data to be put into the table
  OfficerDocList.forEach(element => {
    AddItemToOfficerTable(element.LastName, element.FirstName, element.Username, element.Email);
    
  });
}

//Adding Offenses Data to table
function AddItemToOffensesTable(strOffenseType, strFine){
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');

 
  
  td1.innerHTML = strOffenseType;
  td2.innerHTML = strFine;

  trow.appendChild(td1);
  trow.appendChild(td2);

  tOffensesbody.appendChild(trow);
  
}
  //Creating the tables for Offenses
function AddAllItemsToTheOffensesTable(OffenseDocList){
  
  tOffensesbody.innerHTML="";
  //Asking for data to be put into the table
  OffenseDocList.forEach(element => {
    AddItemToOffensesTable(element.OffenseType, element.FineAmount);
  });

}  
//Adding Parking Lot Data to table
function AddItemToParkingLotsTable(strLotName, longMaxLatitude, longMaxLongitude, longMinLatitude, longMinLongitude){
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');

  
  
  td1.innerHTML = strLotName;
  td2.innerHTML = longMaxLatitude;
  td3.innerHTML = longMaxLongitude;
  td4.innerHTML = longMinLatitude;
  td5.innerHTML = longMinLongitude;

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);

  tParkingLotsbody.appendChild(trow);
  
}
  //Creating the tables for ParkingLots
function AddAllItemsToTheParkingLotsTable(ParkingLotsDocList){
  //Asking for data to be put into the table
  tParkingLotsbody.innerHTML="";
  ParkingLotsDocList.forEach(element => {
    AddItemToParkingLotsTable(element.LotName, element.MaxLatitude, element.MaxLongitude, element.MinLatitude, element.MinLongitude);
    
  });
}

//Adding Vehicle Data to table
function AddItemToVehiclesTable(strColor, strIDNum, strLicenseNum, strLicenseState, strMake, strModel, strOwnerFirstName, strOwnerLastName, strParkingLot){
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');
  var td6 = document.createElement('td');
  var td7 = document.createElement('td');
  var td8 = document.createElement('td');
  var td9 = document.createElement('td');
  

  
  
  td1.innerHTML = strLicenseNum;
  td2.innerHTML = strLicenseState;
  td3.innerHTML = strOwnerFirstName;
  td4.innerHTML = strOwnerLastName;
  td5.innerHTML = strMake;
  td6.innerHTML = strModel;
  td7.innerHTML = strColor;
  td8.innerHTML = strIDNum;
  td9.innerHTML = strParkingLot;


  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);
  trow.appendChild(td7);
  trow.appendChild(td8);
  trow.appendChild(td9);

  tVehiclesbody.appendChild(trow);
  
}
  //Creating the tables for Vehicles
function AddAllItemsToTheVehiclesTable(VehiclesDocList){
  offNo=0;
  //Asking for data to be put into the table
  tVehiclesbody.innerHTML="";
  VehiclesDocList.forEach(element => {
    AddItemToVehiclesTable(element.Color, element.IDNum, element.LicenseNum, element.LicenseState, element.Make, element.Model, element.OwnerFirstName, element.OwnerLastName, element.ParkingLot);    
  });
}
  //Adding Ticket Data to table
function AddItemToTicketsTable(strCarMake, strCarModel, strFineAmount, strLicenseNum, strOffense, strOfficer, strParkingLot, iTicketNum, strTime, strLicenseState){
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');
  var td6 = document.createElement('td');
  var td7 = document.createElement('td');
  var td8 = document.createElement('td');
  var td9 = document.createElement('td');
  var td10 = document.createElement('td');

  //Compare ticket officer value (which is officer and output officer name)
  for(let iOfficerIndex = 0; iOfficerIndex < arrOfficers.length; iOfficerIndex++){
    if (arrOfficers[iOfficerIndex].OfficerID == strOfficer){
      strOfficer = arrOfficers[iOfficerIndex].Username;
      break;
    }
  }
  
  td1.innerHTML = iTicketNum;
  td2.innerHTML = strLicenseNum;
  td3.innerHTML = strLicenseState;
  td4.innerHTML = strOffense;
  td5.innerHTML = strTime;
  td6.innerHTML = strParkingLot;
  td7.innerHTML = strFineAmount;
  td8.innerHTML = strOfficer;
  td9.innerHTML = strCarMake;
  td10.innerHTML = strCarModel;
  
  

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);
  trow.appendChild(td7);
  trow.appendChild(td8);
  trow.appendChild(td9);
  trow.appendChild(td10);
  

  tTicketsbody.appendChild(trow);
  
}
//Creating the tables for Tickets
function AddAllItemsToTheTicketsTable(TicketsDocList){
  offNo=0;
  //Asking for data to be put into the table
  tTicketsbody.innerHTML="";
  TicketsDocList.forEach(element => {
    AddItemToTicketsTable(element.CarMake, element.CarModel, element.FineAmount, element.LicenseNum, element.Offense, element.Officer, element.ParkingLot, element.TicketNum, element.Time, element.LicenseState);
    
  });
}

//Once window loads it gets data from firestore
window.onload = getAllDataOnce();

//Export arrays so they can be added to 
export {arrOfficers};
export {arrLots};
export {arrOffenses};
export {arrVehicles}