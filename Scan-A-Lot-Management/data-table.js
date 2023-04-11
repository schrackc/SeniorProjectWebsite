//Functions:
//Function makes a table visible while making the previous table invisible
function openTable(evt, table) {
  var i, tabContent, tablinks;
  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(table).style.display = "block";
  evt.currentTarget.className += "active";
}


//get all dropdowns from the document
const dropdown = document.querySelectorAll('.dropdown');
//loop thriugh all dropdown elements
dropdown.forEach(dropdown => {
  //get inner elements from each dropdown
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelector('.menu li');
  const selected = dropdown.querySelector('.selected');


  //add a click event to the select element
  select.addEventListener('click', () => {
    //add the clicked select styles to the select element
    select.classList.toggle('select-clicked');
    //add the rotate styles to the caret element
    caret.classList.toggle('caret-rotate');
    //add the open styles to the menu element
    menu.classList.toggle('menu-open');
  })

  //loop through all the option elements
  options.forEach(option => {
    //add a click event to the option element
    option.addEventListener('click', () => {
      //change the selected inner text to the clicked option inner text
      selected.innerText = option.innerText;
      //add the clicked select styles to the select element
      select.classList.remove('select-clicked');
      //add the rotate styles to the caret element
      caret.classList.remove('caret-rotate');
      //add the open styles to the open element
      menu.classList.remove('menu-open');
      //remove active class from all elements
      options.forEach(option => {
        option.classList.remove('active');
      });
      //add active class to clicked option element
      option.classList.add('active');
    });
  });
});