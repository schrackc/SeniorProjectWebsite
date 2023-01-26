const officerList = document.querySelector('#officer-list');

function renderCafe(doc){
    let li = document.createElement('li');
    let Firstname = document.createElement('span');
    let Lastname = document.createElement('span');
    let Password = document.createElement('span');
    let Username = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    Lastname.textContent = doc.data().Lastname;
    Firstname.textContent = doc.data.Firstname;

    li.appendChild(FirstName);
    li.appendChild(Lastname);

    officerList.appendChild(li);
}

db.collection('Officers').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
    })
})