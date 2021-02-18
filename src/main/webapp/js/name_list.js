// Main Javascript File

function htmlSafe(data){
    return data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt");
}

function updateTable(){
    let url = "api/name_list_get";

    $.getJSON(url, null, function(json_result){
        $('#datatable tbody tr:last').after("<tr><td>ID</td><td>First Name</td>" +
                "<td>Last Name</td><td>Email</td><td>Phone</td><td>Birthday</td></tr>");

        for(let i=0; i < json_result.length; i++){
            $('#datatable tbody tr:last').after(`<tr><td>${json_result[i].id}</td><td>` +
                `${htmlSafe(json_result[i].first)}</td><td>${htmlSafe(json_result[i].last)}</td><td>` +
                `${htmlSafe(json_result[i].email)}</td><td>${htmlSafe(json_result[i].phone)}</td><td>` +
                `${htmlSafe(json_result[i].birthday)}</td></tr>`);
        }

        $('#datatable tbody tr:first').remove();

        console.log("Done");
    });
}

updateTable();