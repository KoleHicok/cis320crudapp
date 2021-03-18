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
        $('#datatable tbody').empty();
        $('#datatable tbody').append("<tr><td>No Data</td></tr>")

        $('#datatable tbody tr:last').after("<tr><td>ID</td><td>First Name</td>" +
                "<td>Last Name</td><td>Email</td><td>Phone</td><td>Birthday</td><td>Actions</td></tr>");

        for(let i=0; i < json_result.length; i++){
            $('#datatable tbody tr:last').after(`<tr><td>${json_result[i].id}</td><td>` +
                `${htmlSafe(json_result[i].first)}</td><td>${htmlSafe(json_result[i].last)}</td><td>` +
                `${htmlSafe(json_result[i].email)}</td><td>${formatPhoneNumber(htmlSafe(json_result[i].phone))}</td><td>` +
                `${htmlSafe(getJSDateFromSQLDate(json_result[i].birthday))}</td>` +
                `<td><button type='button' name='delete' class='deleteButton btn btn-danger' value="${json_result[i].id}">Delete</button></td></tr>`);
        }

        $('#datatable tbody tr:first').remove();

        console.log("Done");
    });
}

function resetField(field){
    field.val("");
    field.removeClass("is-invalid");
    field.removeClass("is-valid");
}

function showDialogAdd(){
    // Print that we got here
    console.log("Opening add item dialog");

    let id = $('#id');
    resetField(id);

    let firstName = $('#firstName');
    resetField(firstName);

    let lastName = $('#lastName');
    resetField(lastName);

    let email = $('#email');
    resetField(email);

    let phone = $('#phone');
    resetField(phone);

    let birthday = $('#birthday');
    resetField(birthday);

    // Show the hidden dialog
    $('#myModal').modal('show');
}

function validateField(fieldName, fieldRegex){
    let validEntry = true;

    if(fieldRegex.test(fieldName.val())){
        fieldName.removeClass("is-invalid");
        fieldName.addClass("is-valid");
    }
    else{
        fieldName.removeClass("is-valid");
        fieldName.addClass("is-invalid");
        validEntry = false;
    }

    return validEntry;
}

function saveChanges() {
    let validEntry = true;

    let firstName = $('#firstName');
    let firstreg = /^[A-Za-z]'?[-A-Za-zÁÉÍÓÚáéíóúñ]{1,15}$/;
    if(!validateField(firstName, firstreg)){
        validEntry = false;
    }

    let lastName = $('#lastName');
    let reglast = /^[A-Za-z][-'A-Za-zÁÉÍÓÚáéíóúñ]{1,20}$/;
    if(!validateField(lastName, reglast)){
        validEntry = false;
    }

    let email = $('#email');
    let regemail = /^.*@.*$/;
    if(!validateField(email, regemail)){
        validEntry = false;
    }

    let phone = $('#phone');
    let regphone = /^\(?[0-9]{3}\)?\s?-?[0-9]{3}-?[0-9]{4}$/;
    if(!validateField(phone, regphone)){
        validEntry = false;
    }

    let birthday = $('#birthday');
    let regBday = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    if(!validateField(birthday, regBday)){
        validEntry = false;
    }

    if(validEntry){
        console.log("Saving changes!");
        let url = "api/name_list_edit";
        let dataToServer = { first : firstName.val(),
                             last : lastName.val(),
                             email : email.val(),
                             phone : phone.val().replace(/[\D]/g, ''),
                             birthday : birthday.val()
        };

        console.log(dataToServer);

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(dataToServer),
            success: function(dataFromServer) {
                console.log(dataFromServer);
                updateTable();
                $('#myModal').modal('hide');
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });
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