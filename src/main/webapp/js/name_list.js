// Main Javascript File

function htmlSafe(data){
    return data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt");
}

function formatPhoneNumber(phoneNumberString) {
    // Strip all non-digits
    // Use a regular expression. Match all non-digits \D
    // and replace with an empty string.
    let cleaned = phoneNumberString.replace(/\D/g, '');

    // Are we left with 10 digits? This will return them in
    // three groups. This: (\d{3}) grabs the first three digits \d
    // The 'match' variable is an array. First is the entire match
    // the next locations are each group, which are surrounded by
    // () in the parenthesis.
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

function getJSDateFromSQLDate(sqlDate) {
    // Strip non-digits
    let cleaned = sqlDate.replace(/\D/g, '');
    // Match and group
    let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    // Create a new Date object
    let resultDate = new Date(match[1], match[2], match[3]);
    return resultDate.toLocaleDateString();
}

function updateTable(){
    let url = "api/name_list_get";

    $.getJSON(url, null, function(json_result){
        $('#datatable tbody tr:last').after("<tr><td>ID</td><td>First Name</td>" +
                "<td>Last Name</td><td>Email</td><td>Phone</td><td>Birthday</td></tr>");

        for(let i=0; i < json_result.length; i++){
            $('#datatable tbody tr:last').after(`<tr><td>${json_result[i].id}</td><td>` +
                `${htmlSafe(json_result[i].first)}</td><td>${htmlSafe(json_result[i].last)}</td><td>` +
                `${htmlSafe(json_result[i].email)}</td><td>${formatPhoneNumber(htmlSafe(json_result[i].phone))}</td><td>` +
                `${htmlSafe(getJSDateFromSQLDate(json_result[i].birthday))}</td></tr>`);
        }

        $('#datatable tbody tr:first').remove();

        console.log("Done");
    });
}

function showDialogAdd(){
    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");
    $('#id').removeClass("is-invalid");
    $('#id').removeClass("is-valid");

    $('#firstName').val("");
    $('#firstName').removeClass("is-invalid");
    $('#firstName').removeClass("is-valid");

    $('#lastName').val("");
    $('#lastName').removeClass("is-invalid");
    $('#lastName').removeClass("is-valid");

    $('#email').val("");
    $('#email').removeClass("is-invalid");
    $('#email').removeClass("is-valid");

    $('#phone').val("");
    $('#phone').removeClass("is-invalid");
    $('#phone').removeClass("is-valid");

    $('#birthday').val("");
    $('#birthday').removeClass("is-invalid");
    $('#birthday').removeClass("is-valid");

    // Show the hidden dialog
    $('#myModal').modal('show');
}

function saveChanges() {
    console.log("Saving changes!");
    let firstName = $('#firstName');
    let firstreg = /^[A-Za-z]'?[-A-Za-zÁÉÍÓÚáéíóúñ]{1,15}$/;

    if(firstreg.test(firstName.val())){
        firstName.removeClass("is-invalid");
        firstName.addClass("is-valid");
    }
    else{
        firstName.removeClass("is-valid");
        firstName.addClass("is-invalid");
    }

    let lastName = $('#lastName');
    let reglast = /^[A-Za-z][-'A-Za-zÁÉÍÓÚáéíóúñ]{1,20}$/;

    if(reglast.test(lastName.val())){
        lastName.removeClass("is-invalid");
        lastName.addClass("is-valid");
    }
    else{
        lastName.removeClass("is-valid");
        lastName.addClass("is-invalid");
    }

    let email = $('#email');
    let regemail = /^.*@.*$/;

    if(regemail.test(email.val())){
        email.removeClass("is-invalid");
        email.addClass("is-valid");
    }
    else{
        email.removeClass("is-valid");
        email.addClass("is-invalid");
    }

    let phone = $('#phone');
    let regphone = /^\+?1?\s?\(?[0-9]{3}\)?\s?-?[0-9]{3}-?[0-9]{4}$/;

    if(regphone.test(phone.val())){
        phone.removeClass("is-invalid");
        phone.addClass("is-valid");
    }
    else{
        phone.removeClass("is-valid");
        phone.addClass("is-invalid");
    }

    let birthday = $('#birthday');
    let regBday = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

    if(regBday.test(birthday.val())){
        birthday.removeClass("is-invalid");
        birthday.addClass("is-valid");
    }
    else{
        birthday.removeClass("is-valid");
        birthday.addClass("is-invalid");
    }
}

updateTable();

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

// Button to ave changes from the form
let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges)