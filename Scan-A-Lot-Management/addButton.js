// When the User Clicks add Officer Popup Form Appears
function addPopup(strTableAddType) {
    var popup = document.getElementById(strTableAddType);
    popup.classList.toggle("show");
}

// Popup Add Officer Button Clicked
function createOfficer(strTableAddType) {
    //Get Variable
    var strFirstName = document.getElementById(firstName);
    var strLastName = document.getElementById(lastName);
    var strEmail = document.getElementById(email);
    var strPassword = document.getElementById(password);
    var strPasswordConfirm = document.getElementById(password2);

    if (strPassword != strPasswordConfirm){
        //Show Passwords don't match

        return
    }

    //Create New Firebase Authentication Account
    

    //Create new officer Account


    //Clear Values

    //Close Popup
    var popup = document.getElementById(strTableAddType);
    popup.classList.toggle("show");
}