
//This will be the collection for Officers. Will make a new JS file unique for each other table. 

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
        
        
  
      //Get data
      function getAllDataOnce(){
        db.collection("Officers").get().then((querySnapshot)=>{
          var Officers = [];
          querySnapshot.forEach(doc => {
            Officers.push(doc.data());
          });
          AddAllItemsToTheOfficerTable(Officers);
        }); 
        db.collection("Offenses").get().then((querySnapshot)=>{
          var Offenses = [];
          querySnapshot.forEach(doc => {
            Offenses.push(doc.data());
          });
          AddAllItemsToTheOffensesTable(Offenses);
        });
      }
  
    
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
      }
     
      //filling the table
      var offNo = 0;
      var tOfficerbody = document.getElementById("tbody1");

      function AddItemToOfficerTable(LastName, FirstName, Username, Email){
        var trow = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var mod = document.createElement('style');

        //td1.innerHTML = ++offNo;
        
        td1.innerHTML = LastName;
        td2.innerHTML = FirstName;
        td3.innerHTML = Username;
        td4.innerHTML = Email;
        mod.enterHTML = "Modify";

        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        trow.appendChild(mod);

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
          //Once window loads it gets data from firestore
      window.onload = getAllDataOnce;
    
    