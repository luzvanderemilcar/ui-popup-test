let regex  = /([+\-×÷]{1,})(?=([+×÷][\-]{0,1}[0-9.]+))/g;
 //regex = /\d+/g;
let testSting = "23÷++-5÷+××-3";
console.log(testSting.match(regex));

function signCleanUp(str) {
    //--|++ => + change 2 minus or 2 plus into 1 plus
    const doubleSignRegex = /[\-+]{2}(?=[0-9.]+)/g;
    let str2 = str.replace(doubleSignRegex, "+");

    // handle multiple signs to the last one
    const signCleanUpRegex = /([+\-×÷]{1,})(?=([+×÷][\-]{0,1}[0-9.]+))/g;

    return str2.replace(signCleanUpRegex, "");
}

console.log(signCleanUp (testSting));