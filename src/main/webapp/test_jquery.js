// Test jQuery script

let paragraphs = $("p");

console.log(paragraphs);

console.log("There are " + paragraphs.length + " paragraphs.");

for(let i = 0; i < paragraphs.length; i++){
    let paragraphText = paragraphs[i].textContent;
    console.log(paragraphText);
}

function updateTable(event){
    console.log("Add Row");
    let fieldValue = $("#myTextField").val();
    $("#tableName tbody").append("<tr><td>"+fieldValue+"</td></tr>");
    console.log("Added: " + fieldValue);
}

let formButton1 = $("#button1");
formButton1.on("click", updateTable);

function hideFunction(event){
    $("#hideme").hide(500);
    console.log("Hidden");
}

let formButton2 = $("#button2");
formButton2.on("click", hideFunction);

function validateFunction(event){
    let formField = $("#validateMe").val();
    let regExpression = /^[A-Za-z0-9]{1,10}$/;

    if(regExpression.test(formField)){
        console.log("Good");
    }
    else{
        console.log("Bad");
    }
}

let formButton3 = $("#button3");
formButton3.on("click", validateFunction);

function jsonFunction(event){
    let formJSONObject = {};
    let formVal = $("#myName").val();
    formJSONObject.myName = formVal;
    let jsonString = JSON.stringify(formJSONObject);
    console.log(jsonString);
    $("#jsonResult").text(jsonString);
}

let formButton4 = $("#button4");
formButton4.on("click", jsonFunction);