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

function AddItemToOfficerTable(LastName, FirstName, Username, Email){
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');

  //td1.innerHTML = ++offNo;
  
  td1.innerHTML = LastName;
  td2.innerHTML = FirstName;
  td3.innerHTML = Username;
  td4.innerHTML = Email;

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);

  tOfficerbody.appendChild(trow);
}
function AddAllItemsToTheOfficerTable(OfficerDocList){
  offNo=0;
  tOfficerbody.innerHTML="";
  OfficerDocList.forEach(element => {
    AddItemToOfficerTable(element.LastName, element.FirstName, element.Username, element.Email);
    
  });
}

function AddItemToOffensesTable(OffenseType, Fine){
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');

 
  
  td1.innerHTML = OffenseType;
  td2.innerHTML = Fine;

  trow.appendChild(td1);
  trow.appendChild(td2);

  tOffensesbody.appendChild(trow);
  
}
  
function AddAllItemsToTheOffensesTable(OffenseDocList){
  
  tOffensesbody.innerHTML="";
  OffenseDocList.forEach(element => {
    AddItemToOffensesTable(element.OffenseType, element.FineAmount);
  });

}  
//Adding Parking Lot Data to table
function AddItemToParkingLotsTable(LotName, MaxLatitude, MaxLongitude, MinLatitude, MinLongitude){
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');

  
  
  td1.innerHTML = LotName;
  td2.innerHTML = MaxLatitude;
  td3.innerHTML = MaxLongitude;
  td4.innerHTML = MinLatitude;
  td5.innerHTML = MinLongitude;

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);

  tParkingLotsbody.appendChild(trow);
  
}
  
function AddAllItemsToTheParkingLotsTable(ParkingLotsDocList){
  
  tParkingLotsbody.innerHTML="";
  ParkingLotsDocList.forEach(element => {
    AddItemToParkingLotsTable(element.LotName, element.MaxLatitude, element.MaxLongitude, element.MinLatitude, element.MinLongitude);
    
  });
}
//Adding Vehicle Data to table
function AddItemToVehiclesTable(Color, IDNum, LicenseNum, LicenseState, Make, Model, OwnerFirstName, OwnerLastName, ParkingLot){
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

  
  
  td1.innerHTML = LicenseNum;
  td2.innerHTML = LicenseState;
  td3.innerHTML = OwnerFirstName;
  td4.innerHTML = OwnerLastName;
  td5.innerHTML = Make;
  td6.innerHTML = Model;
  td7.innerHTML = Color;
  td8.innerHTML = IDNum;
  td9.innerHTML = ParkingLot;


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
  
function AddAllItemsToTheVehiclesTable(VehiclesDocList){
  offNo=0;
  tVehiclesbody.innerHTML="";
  VehiclesDocList.forEach(element => {
    AddItemToVehiclesTable(element.Color, element.IDNum, element.LicenseNum, element.LicenseState, element.Make, element.Model, element.OwnerFirstName, element.OwnerLastName, element.ParkingLot);    
  });
}
  //Adding Ticket Data to table
function AddItemToTicketsTable(CarMake, CarModel, FineAmount, LicenseNum, Offense, Officer, ParkingLot, TicketNum, Time, LicenseState){
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

  
  
  td1.innerHTML = TicketNum;
  td2.innerHTML = LicenseNum;
  //State needs added as a firestore collection 
  td3.innerHTML = LicenseState;
  td4.innerHTML = Offense;
  td5.innerHTML = Time;
  td6.innerHTML = ParkingLot;
  td7.innerHTML = FineAmount;
  td8.innerHTML = Officer;
  td9.innerHTML = CarMake;
  td10.innerHTML = CarModel;
  
  

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

function AddAllItemsToTheTicketsTable(TicketsDocList){
  offNo=0;
  tTicketsbody.innerHTML="";
  TicketsDocList.forEach(element => {
    AddItemToTicketsTable(element.CarMake, element.CarModel, element.FineAmount, element.LicenseNum, element.Offense, element.Officer, element.ParkingLot, element.TicketNum, element.Time, element.LicenseState);
    
  });

}

//Once window loads it gets data from firestore
window.onload = getAllDataOnce();

//Export arrays so they can be added to 
export {arrVehicles};
export {arrOfficers};
export {arrLots};
export {arrOffenses};