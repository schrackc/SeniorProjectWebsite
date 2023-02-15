// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

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

login.addEventListener('click',(e)=>{
var email = document.getElementById('email').value;
var password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    const dt = new Date();
     update(ref(database, 'users/' + user.uid),{
      last_login: dt,
    })
    //Links to next page here if user is logged in. Doesnt take to next page if user fails to enter valid credentials. 
    window.location.href='data-tables.html'
     alert('User logged in!');
  
  })
  //If error result output
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
  });

});