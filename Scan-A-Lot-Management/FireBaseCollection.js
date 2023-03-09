src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"
src="https://www.gstatic.com/firebasejs/8.2.1/firebase-auth.js"
src="https://www.gstatic.com/firebasejs/8.2.1/firebase-firestore.js"   


        
      
const firebaseConfig = {
  apiKey: "AIzaSyDIEtCfoSgt-Ka56fFwouFDvEXId0Xrk78",
  authDomain: "scan-a-lot.firebaseapp.com",
  databaseURL: "https://scan-a-lot-default-rtdb.firebaseio.com",
  projectId: "scan-a-lot",
  storageBucket: "scan-a-lot.appspot.com",
  messagingSenderId: "816922417821",
  appId: "1:816922417821:web:ba0a3811f84a8cbbacd274",
  measurementId: "G-LVFHL8LFNV"
};


      firebase.initializeApp(firebaseConfig);
      let db= firebase.firestore();
      
      

    //Get data
    function getAllDataOnce(){
      db.collection("Officers").get().then((querySnapshot)=>{
        var Officers = [];
        querySnapshot.forEach(doc => {
          Officers.push(doc.data());
        });
        AddAllItemsToTheTable(Officers);
      });
    }

  
    function getAllDataRealTime(){
      db.collection("Officers").onSnapshot((querySnapshot)=>{
        var Officers = [];
        querySnapshot.forEach(doc => {
          Officers.push(doc.data());
        });

        AddAllItemsToTheTable(Officers);
      });
    }
   
      //filling the table
      var offNo = 0;
      var tbody = document.getElementById("tbody1");

      function AddItemToTable(LastName, FirstName, Username, Email){
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

        tbody.appendChild(trow);
      }
      function AddAllItemsToTheTable(OfficerDocList){
        offNo=0;
        tbody.innerHTML="";
        OfficerDocList.forEach(element => {
          AddItemToTable(element.LastName, element.FirstName, element.Username, element.Email);
          
        });

      }
        //Once window loads it gets data from firestore
    window.onload = getAllDataOnce;
  
