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

function deleteItem(e){
    console.log("Delete");
    console.log(e.target.value);

    console.log("Deleting row!");
    let url = "api/name_list_delete";
    let dataToServer = {id : e.target.value};

    console.log(dataToServer);

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: function(dataFromServer) {
            console.log(dataFromServer);
            updateTable();
        },
        contentType: "application/json",
        dataType: 'text'
    });
}

$('#myModal').on('shown.bs.modal', function () {
    $('#firstName').focus();
})

function editItem(e) {
    console.log("Editing Item");
    console.log("Edit: " + e.target.value);

    let id = e.target.value;
    let first = e.target.parentNode.parentNode.querySelectorAll("td")[0].innerHTML;
    let last = e.target.parentNode.parentNode.querySelectorAll("td")[1].innerHTML;
    let email = e.target.parentNode.parentNode.querySelectorAll("td")[2].innerHTML;
    let phone = e.target.parentNode.parentNode.querySelectorAll("td")[3].innerHTML;
    let birthday = e.target.parentNode.parentNode.querySelectorAll("td")[4].innerHTML;

    let regexp = /\((\d{3})\) (\d{3})-(\d{4})/;
    let match = phone.match(regexp);
    console.log("Matches:");
    console.log(match);
    let phoneString = "" + match[1] + "-" + match[2] + "-" + match[3];

    let timestamp = Date.parse(birthday);
    let dateObject = new Date(timestamp);
    let fullDateString = dateObject.toISOString();
    let shortDateString = fullDateString.split('T')[0];

    $('#id').val(id);
    $('#firstName').val(first);
    $('#lastName').val(last);
    $('#email').val(email);
    $('#phone').val(phoneString);
    $('#birthday').val(shortDateString);

    $('#myModal').modal('show');
}

function updateTable(){
    let url = "api/name_list_get";

    $.getJSON(url, null, function(json_result){
        $('#datatable tbody').empty();
        $('#datatable tbody').append("<tr><td>No Data</td></tr>")

        $('#datatable tbody tr:last').after("<tr><td>First Name</td>" +
                "<td>Last Name</td><td>Email</td><td>Phone</td><td>Birthday</td><td>Actions</td></tr>");

        for(let i=0; i < json_result.length; i++){
            $('#datatable tbody tr:last').after(`<tr><td>` +
                `${htmlSafe(json_result[i].first)}</td><td>${htmlSafe(json_result[i].last)}</td><td>` +
                `${htmlSafe(json_result[i].email)}</td><td>${formatPhoneNumber(htmlSafe(json_result[i].phone))}</td><td>` +
                `${htmlSafe(getJSDateFromSQLDate(json_result[i].birthday))}</td><td>` +
                `<button type='button' name='edit' class='editButton btn btn-primary' value="${json_result[i].id}">Edit</button>` + "&nbsp;" +
                `<button type='button' name='delete' class='deleteButton btn btn-danger' value="${json_result[i].id}">Delete</button></td></tr>`);
        }

        $('#datatable tbody tr:first').remove();

        $(".deleteButton").on("click", deleteItem);
        $(".editButton").on("click", editItem);

        console.log("Done");
    });
}

updateTable();

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

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

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

    let birthday = $('#birthday');
    let regBday = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    if(!validateField(birthday, regBday)){
        validEntry = false;
        birthday.focus();
    }

    let phone = $('#phone');
    let regphone = /^\(?[0-9]{3}\)?\s?-?[0-9]{3}-?[0-9]{4}$/;
    if(!validateField(phone, regphone)){
        validEntry = false;
        phone.focus();
    }

    let email = $('#email');
    let regemail = /^.*@.*$/;
    if(!validateField(email, regemail)){
        validEntry = false;
        email.focus();
    }

    let lastName = $('#lastName');
    let reglast = /^[A-Za-z][-'A-Za-zÁÉÍÓÚáéíóúñ]{1,20}$/;
    if(!validateField(lastName, reglast)){
        validEntry = false;
        lastName.focus();

    }

    let firstName = $('#firstName');
    let firstreg = /^[A-Za-z]'?[-A-Za-zÁÉÍÓÚáéíóúñ]{1,15}$/;
    if(!validateField(firstName, firstreg)){
        validEntry = false;
        firstName.focus();
    }

    let id = $('#id');

    if(validEntry) {
        console.log("Saving changes!");
        let url = "api/name_list_edit";
        let dataToServer;
        if (id.val() != "") {
            dataToServer = {
                id: id.val(),
                first: firstName.val(),
                last: lastName.val(),
                email: email.val(),
                phone: phone.val().replace(/[\D]/g, ''),
                birthday: birthday.val()
            };
        }
        else{
            dataToServer = {
                first: firstName.val(),
                last: lastName.val(),
                email: email.val(),
                phone: phone.val().replace(/[\D]/g, ''),
                birthday: birthday.val()
            };
        }

        console.log(dataToServer);

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(dataToServer),
            success: function(dataFromServer) {
                console.log(dataFromServer);
                let result = JSON.parse(dataFromServer);
                if ('error' in result) {
                    alert(result.error);
                    $('#toast-body').html('Error!')
                    $('#myToast').toast({delay: 5000});
                    $('#myToast').toast('show');
                }
                else {
                    updateTable();
                    $('#myModal').modal('hide');
                    $('#toast-body').html('Success! Record updated.')
                    $('#myToast').toast({delay: 5000});
                    $('#myToast').toast('show');
                }
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });
    }
}

// Button to save changes from the form
let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges)

$(document).keydown(function(e) {
    console.log(e.keyCode);
    if(e.keyCode == 65 && !$('#myModal').is(':visible')){
        showDialogAdd();
    }
    if(e.keyCode == 13 && $('#myModal').is(':visible')) {
        saveChanges();
    }
});

