// Comment. Ignored by computers
/*
Another
way
to
comment.
 */

console.log("Hello there world!");

// ES 5
var x = 1;

// ES 6 use let and const
let y = 1;
const z = 1;

let variableOne = 5;
let variableTwo = 6;
console.log("variableOne: " + variableOne + " variableTwo: " + variableTwo);

let variableThree = variableOne + variableTwo;
variableThree++;
console.log("variableThree: " + variableThree);

function addNumbers(a, b){
    return a + b;
}

console.log("Add Numbers Output: " + addNumbers(1, 2));

x = addNumbers(2, 5);

let otherFunction = addNumbers;

x = otherFunction(22, 26);
console.log("x: " + x);

// JSON
let personA = {
                name: "Kole",
                email: "kole.hicok@my.simpson.edu"
            };

console.log(personA);
console.log(personA.name);
console.log(personA["name"])

// ES6 class
class PersonB {
    constructor() {
        this.name = "";
        this.email = "";
    }
}

let personB = new PersonB();
personB.name = "Jeff";
personB.email = "Winger@greendale.com";
console.log(personB);
console.log(personB.name);

// ES5 class
var personD = {
    firstName: "Kole",
    lastName: "Hicok",
    fullName: function(){
        return this.firstName + " " + this.lastName;
    }
}
console.log(personD.fullName())

// Loops
for(let i = 0; i < 10; i++) {
    console.log(i);
}

let colors = ["red", "yellow", "blue"];
for(let i = 0; i < colors.length; i++){
    console.log(colors[i]);
}

let personF = {name: "Kole", email: "Kole.hicok@my.simpson.edu"}

for(let field in personF) {
    console.log(field + " = " + personF[field]);
}

let a = 5;
let b = 6;
if(a==b)console.log("Same");
else console.log("Different");

a = "Kole";
b = "Kole";

if (a === b){
    console.log("a = b");
}

a = 5;
b = 6;
let c = a + b;

console.log(c);

c = a.toString() + b;
console.log(c);

a = "5";
b = "6";
c = Number(a) + Number(b);
console.log(c);

