// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIEtCfoSgt-Ka56fFwouFDvEXId0Xrk78",
  authDomain: "scan-a-lot.firebaseapp.com",
  projectId: "scan-a-lot",
  storageBucket: "scan-a-lot.appspot.com",
  messagingSenderId: "816922417821",
  appId: "1:816922417821:web:ba0a3811f84a8cbbacd274",
  measurementId: "G-LVFHL8LFNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


//Check If User Signed In
document.addEventListener("DOMContentLoaded", (loginStat) =>{
    //Checks if Authorized user is signed in
    onAuthStateChanged(auth, (user) => {
      //Go Back to Login or if no user else show page information
      if(user == null) {
        window.location.href = 'index.html'; //If User Is Not Logged In, Redirect To Login Page
      }else{
        document.getElementById("webpage").style.visibility = "visible";
      }
    })
})

//Logout out user
logout.addEventListener('click', (logoutResult)=> {
    //Turns authorized user to null
    auth.signOut();
    window.location.href = 'index.html';
  })