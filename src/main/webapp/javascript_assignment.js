/*
* Assignment 2
* Javascript
*/

function helloButton(event){
    console.log("Hello");
}

let formButton1 = $('#button1');
formButton1.on("click", helloButton);

function addFields(event){
    let result = Number($("#field1").val()) + Number($("#field2").val());
    $("#field3").val(result);
}

let formButton2 = $('#button2');
formButton2.on("click", addFields);

function changeVisibility(event){
    let toChange = $("#paragraphToHide");
    if(toChange.is(":visible")){
        toChange.hide(500);
    }
    else{
        toChange.show(500);
    }
}

let formButton3 = $('#button3');
formButton3.on("click", changeVisibility);

function validatePhone(event){
    let fieldValue = $("#phoneField").val();
    let regex = /\d{3}-\d{3}-\d{4}/

    if(regex.test(fieldValue)){
        console.log("OK");
    }
    else{
        console.log("Bad");
    }
}

let formButton4 = $('#button4');
formButton4.on("click", validatePhone);

function createJson(event){
    let jsonObject = {};

    jsonObject.firstName = $("#firstName").val();
    jsonObject.lastName = $("#lastName").val();
    jsonObject.email = $("#email").val();

    console.log(JSON.stringify(jsonObject));
}

let formButton5 = $('#button5');
formButton5.on("click", createJson);
