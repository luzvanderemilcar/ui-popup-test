import {calculate, add, multiply,divide, subtract, modulo } from "./caculator-function.js";

console.log(multiply(2,3))
//Regex to test the input
const operatorRegex = /[+\-×÷]/g;
const numberRegex = /[0-9]/g;

function signCleanUp(str) {
    //--|++ => + change 2 minus or 2 plus into 1 plus
    const doubleSignRegex = /[\-+]{2}(?=[0-9.]+)/g;
    let str2 = str.replace(doubleSignRegex, "+");

    // handle multiple signs to the last one
    const signCleanUpRegex = /([+\-×÷]{1,})(?=([+×÷][\-]{0,1}[0-9.]+))/g;

    return str2.replace(signCleanUpRegex, "");
}

function inputCheck(str, data) {
    let result;
    // Input a sign right after another 
    if (operatorRegex.test(str[str.length - 1]) && operatorRegex.test(data)) {
        if (data = "-") {
            result = str + data;
            console.log(result)
        } else {
        result = str.slice(0, str.length - 1) + data;
        }
    }
   else if (str == "0") {
        if (data == "." || operatorRegex.test(data)) {
            result = str + data

        }
        else if (numberRegex.test(data)) {
            result = data;
        }
    }
    
    else if (str != "0") {
        // allow only one decimal point for a number
        if (data == "." && !haveDecimalPoint(str)) {
            result = str + data;
        }

       /* else if (numberRegex.test(data) || operatorRegex.test(data)) {
            result = str + data;

        }*/
    }
    return result;
}

let stringProcess = "+";
let dataProcess = "+";

//console.log(inputCheck(stringProcess, dataProcess))
console.log(operatorRegex.test(stringProcess));
console.log(operatorRegex.test(dataProcess));
// There is a bug here, I test the same input with two different result

console.log(operatorRegex.test(stringProcess));
console.log(operatorRegex.test(dataProcess));

function haveDecimalPoint(str) {
    let arrNumbers = str.split(operatorRegex);
    return /[.]/.test(arrNumbers[arrNumbers.length - 1]);
}