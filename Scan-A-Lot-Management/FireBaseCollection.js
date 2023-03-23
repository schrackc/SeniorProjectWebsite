


//src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js";


  // src="https://www.gstatic.com/firebasejs/8.2.1/firebase-auth.js";
   //src="https://www.gstatic.com/firebasejs/8.2.1/firebase-firestore.js";    
   
  
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig2 = {
    apiKey: "AIzaSyDIEtCfoSgt-Ka56fFwouFDvEXId0Xrk78",
    authDomain: "scan-a-lot.firebaseapp.com",
    databaseURL: "https://scan-a-lot-default-rtdb.firebaseio.com",
    projectId: "scan-a-lot",
    storageBucket: "scan-a-lot.appspot.com",
    messagingSenderId: "816922417821",
    appId: "1:816922417821:web:ba0a3811f84a8cbbacd274",
    measurementId: "G-LVFHL8LFNV"
  };

 
        firebase.initializeApp(firebaseConfig2);
        let db= firebase.firestore();
        
        
  
      //Officers
      //Get Data
      function getAllDataOnce(){
        db.collection("Officers").get().then((querySnapshot)=>{
          var Officers = [];
          querySnapshot.forEach(doc => {
            Officers.push(doc.data());
          });
          AddAllItemsToTheOfficerTable(Officers);
        }); 
        //Offenses
        db.collection("Offenses").get().then((querySnapshot)=>{
          var Offenses = [];
          querySnapshot.forEach(doc => {
            Offenses.push(doc.data());
          });
          AddAllItemsToTheOffensesTable(Offenses);
        });
        //ParkingLots
        db.collection("ParkingLots").get().then((querySnapshot)=>{
          var ParkingLots = [];
          querySnapshot.forEach(doc => {
            ParkingLots.push(doc.data());
          });
          AddAllItemsToTheParkingLotsTable(ParkingLots);
        });
        //Vehicles
        db.collection("Vehicles").get().then((querySnapshot)=>{
          var Vehicles = [];
          querySnapshot.forEach(doc => {
            Vehicles.push(doc.data());
          });
          AddAllItemsToTheVehiclesTable(Vehicles);
        });
        //Tickets
        db.collection("Tickets").get().then((querySnapshot)=>{
          var Tickets = [];
          querySnapshot.forEach(doc => {
            Tickets.push(doc.data());
          });
          AddAllItemsToTheTicketsTable(Tickets);
        });
      }
  
    /////////////////////////////////////////////
      function getAllDataRealTime(){
        db.collection("Officers").onSnapshot((querySnapshot)=>{
          var Officers = [];
          querySnapshot.forEach(doc => {
            Officers.push(doc.data());
          });
  
          AddAllItemsToTheOfficerTable(Officers);
        });
        db.collection("Offenses").onSnapshot((querySnapshot)=>{
          var Offenses = [];
          querySnapshot.forEach(doc => {
            Offenses.push(doc.data());
          });
  
          AddAllItemsToTheOffensesTable(Offenses);
        });
        db.collection("ParkingLots").onSnapshot((querySnapshot)=>{
          var ParkingLots = [];
          querySnapshot.forEach(doc => {
            ParkingLots.push(doc.data());
          });
  
          AddAllItemsToTheParkingLotsTable(ParkingLots);
        });
        db.collection("Vehicles").onSnapshot((querySnapshot)=>{
          var Vehicles = [];
          querySnapshot.forEach(doc => {
            Vehicles.push(doc.data());
          });
  
          AddAllItemsToTheVehiclesTable(Vehicles);
        });
        db.collection("Tickets").onSnapshot((querySnapshot)=>{
          var Tickets = [];
          querySnapshot.forEach(doc => {
            Tickets.push(doc.data());
          });
  
          AddAllItemsToTheTicketsTable(Tickets);
        });
      }
     
      //filling the table
      var offNo = 0;
      var tOfficerbody = document.getElementById("tbody3");

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
       //filling the table
       var offNo = 0;
       var tOffensesbody = document.getElementById("tbody5");
 
       function AddItemToOffensesTable(OffenseType, Fine){
         var trow = document.createElement('tr');
         var td1 = document.createElement('td');
         var td2 = document.createElement('td');
 
         //td1.innerHTML = ++offNo;
         
         td1.innerHTML = OffenseType;
         td2.innerHTML = Fine;
 
         trow.appendChild(td1);
         trow.appendChild(td2);
 
         tOffensesbody.appendChild(trow);
         
       }
       
       function AddAllItemsToTheOffensesTable(OffenseDocList){
         offNo=0;
         tOffensesbody.innerHTML="";
         OffenseDocList.forEach(element => {
           AddItemToOffensesTable(element.OffenseType, element.Fine);
           
         });
 
       }
       

        //filling the ParkingLots
        var offNo = 0;
        var tParkingLotsbody = document.getElementById("tbody4");
  
        function AddItemToParkingLotsTable(LotName, MaxLatitude, MaxLongitude, MinLatitude, MinLongitude){
          var trow = document.createElement('tr');
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');
          var td3 = document.createElement('td');
          var td4 = document.createElement('td');
          var td5 = document.createElement('td');
  
          //td1.innerHTML = ++offNo;
          
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
          offNo=0;
          tParkingLotsbody.innerHTML="";
          ParkingLotsDocList.forEach(element => {
            AddItemToParkingLotsTable(element.LotName, element.MaxLatitude, element.MaxLongitude, element.MinLatitude, element.MinLongitude);
            
          });
  
        }
        //filling the Vehicles
       var offNo = 0;
       var tVehiclesbody = document.getElementById("tbody2");
 
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
 
         //td1.innerHTML = ++offNo;
         
         td1.innerHTML = Color;
         td2.innerHTML = IDNum;
         td3.innerHTML = LicenseNum;
         td4.innerHTML = LicenseState;
         td5.innerHTML = Make;
         td6.innerHTML = Model;
         td7.innerHTML = OwnerFirstName;
         td8.innerHTML = OwnerLastName;
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
       //filling the table
       var offNo = 0;
       var tTicketsbody = document.getElementById("tbody6");
 
       function AddItemToTicketsTable(CarMake, CarModel, FineAmount, LicenseNum, Offense, Officer, ParkingLot, TicketNum, Time){
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
         
 
         //td1.innerHTML = ++offNo;
         
         td1.innerHTML = CarMake;
         td2.innerHTML = CarModel;
         td3.innerHTML = FineAmount;
         td4.innerHTML = LicenseNum;
         td5.innerHTML = Offense;
         td6.innerHTML = Officer;
         td7.innerHTML = ParkingLot;
         td8.innerHTML = TicketNum;
         td9.innerHTML = Time;
         
 
         trow.appendChild(td1);
         trow.appendChild(td2);
         trow.appendChild(td3);
         trow.appendChild(td4);
         trow.appendChild(td5);
         trow.appendChild(td6);
         trow.appendChild(td7);
         trow.appendChild(td8);
         trow.appendChild(td9);
         
 
         tTicketsbody.appendChild(trow);
         
       }
       
       function AddAllItemsToTheTicketsTable(TicketsDocList){
         offNo=0;
         tTicketsbody.innerHTML="";
         TicketsDocList.forEach(element => {
           AddItemToTicketsTable(element.CarMake, element.CarModel, element.FineAmount, element.LicenseNum, element.Offense, element.Officer, element.ParkingLot, element.TicketNum, element.Time);
           
         });
 
       }
          //Once window loads it gets data from firestore
      window.onload = getAllDataOnce;
    
    