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

let myObject = {
    firstname: "Luzvander",
    lastname: "EMILCAR",
    age: 28
}
console.log(myObject.gender);

let userProvidedId = 138;
const mainUrl = "https://dai.ly/x5b0pykkdk";
let settings = {
    method: "GET",
    mode: "cors",
    headers: {
        'Content-Type': 'application/json'
    }
}


try {
const currentUser = await getUser(mainUrl, settings, userProvidedId);
} catch(err) {
    console.log(err)
}
    



function getUser(url, options, userId) {
    // Convert JSON response into usable data 
    /*
    const data = await response.json();

      const response = await fetch(url, options);
      let matchedUser ;
      for (let user of data) {
        if (user.id == userId) {
            matedchuser = user
        }
        break;
      }
      return matchedUser;
      */
}
