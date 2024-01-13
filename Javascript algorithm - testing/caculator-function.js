//Test for Calculator function

function calculate(...arr) {
    /*arr === [a, b, ..., operator]*/
    let numbers = arr.slice(0, arr.length - 1);
    let operator = arr[arr.length - 1];
    return operator(...numbers);
}

const multiply = function(...arr) {
    //Only one argument passed through 
    if (arr.length < 2) {
        return (c) => arr[0] * c;
    }
    //Multiple arguments passed through 
    else if (arr.length >= 2) {
        return arr.reduce((acc, item, index) => {
            acc *= item;
            return acc;
        });
    }
}

const add = function(...arr) {
    if (arr.length < 2) {
        return (c) => arr[0] + c;
    }
    else if (arr.length >= 2) {
        return arr.reduce((acc, item, index) => {
            acc += item;
            return acc;
        });
    }
}

const subtract = function(...arr) {
    if (arr.length < 2) {
        return (c) => arr[0] - c;
    }
    else if (arr.length >= 2) {
        return arr.reduce((acc, item, index) => {
            acc -= item;
            return acc;
        });
    }
};

const divide = function(...arr) {
    if (arr.length < 2) {
        return (c) => arr[0] / c;
    }
    else if (arr.length >= 2) {
        return arr.reduce((acc, item, index) => {
            acc /= item;
            return acc;
        });
    }
}

const modulo = function(...arr) {
    if (arr.length < 2 || arr.length > 2) {
        console.error(`Error ! Check modulo input`);
    }
    else {
        let [a, b] = arr;
        let integerPart = Math.floor(a / b) * b;
        return a - integerPart;
    }
}
console.log(`${modulo(100, 3)}\n${signToOperator("%")(100,3)}`);


function signToOperator(sign) {
    switch (sign) {
        case "*":
            return multiply;
            break;
        case "/":
            return divide;
            break;
        case "+":
            return add;
            break;
        case "-":
            return subtract;
            break;
        case "%":
            return modulo;
            break;
        default:
            console.error('Check the operator sign');
            break;
    }
}

export {calculate, add, multiply,divide, subtract, modulo };