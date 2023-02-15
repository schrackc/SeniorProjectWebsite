
//import cdns to connect to firebase
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js"
//import { getFireStore} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js"
const firebaseConfig = {
    apiKey: "AIzaSyDIEtCfoSgt-Ka56fFwouFDvEXId0Xrk78",
    authDomain: "scan-a-lot.firebaseapp.com",
    projectId: "scan-a-lot",
    storageBucket: "scan-a-lot.appspot.com",
    messagingSenderId: "816922417821",
    appId: "1:816922417821:web:ba0a3811f84a8cbbacd274",
    measurementId: "G-LVFHL8LFNV"
  };


  
/**
 * 
 * email - the user input for email
 * password - the user input for password
 */

  function signIn(email, password){
    //initialize the firebase app
   const firebaseApp = initializeApp(firebaseConfig);
   //get the get the authentication credentials to access our firebase app
  const auth = getAuth(firebaseApp);
  //use the firebase sign in with email method
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  
    console.log("User Successfully Signed In using " + email);
    //TODO: direct user to next location 


  })
  .catch((error) => {
    //if user failed to login with the right credentials this will occur
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error Code: " + errorCode + " errorMesssage: " + errorMessage);
  });
  }
  //just exporting this function called signIn to use in the other module in inde.html
  export {signIn};
