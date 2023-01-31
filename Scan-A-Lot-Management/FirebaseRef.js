import { initializeApp } from "firebase/app "
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
// const officerList = document.querySelector('#officer-list');

// function renderCafe(doc){
//     let li = document.createElement('li');
//     let Firstname = document.createElement('span');
//     let Lastname = document.createElement('span');
//     let Password = document.createElement('span');
//     let Username = document.createElement('span');

//     li.setAttribute('data-id', doc.id);
//     Lastname.textContent = doc.data().Lastname;
//     Firstname.textContent = doc.data.Firstname;

//     li.appendChild(FirstName);
//     li.appendChild(Lastname);

//     officerList.appendChild(li);
// }

// db.collection('Officers').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data())
//     })
// })
function submitForm(e){
    e.preventDefault();

    console.log(123)
}