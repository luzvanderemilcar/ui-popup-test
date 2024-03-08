//Encryption 

function decrypt(string, key) {
    return encrypt(string, key, -1)
}

function encrypt(str, key, direction = 1) {
    let keyIndex = 0; // Key initial value
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let abRegex = /[A-Z]/i;

    //Accumulator 
    let result = "";

    for (let i = 0; i < str.length; i++) {

        let currentChar, keyChar, upperCasedKeyChar, upperCasedCurrentChar, charIndex, offset;

        currentChar = str[i];

        // keyChar depending on key length and keyIndex
        keyChar = key[keyIndex % key.length];

        // Uppercase 
        upperCasedKeyChar = keyChar.toUpperCase();
        upperCasedCurrentChar = currentChar.toUpperCase();
        charIndex = alphabet.indexOf(upperCasedCurrentChar);
        offset = alphabet.indexOf(upperCasedKeyChar);

        if (abRegex.test(upperCasedCurrentChar)) {
            let newChar;
            let newCharIndex = (charIndex + offset * direction) % alphabet.length;

            if (newCharIndex < 0) {
                newCharIndex += alphabet.length;
            }

            newChar = alphabet[newCharIndex];


            if (isUpperCased(currentChar)) {
                result += newChar
            } else {
                result += stringToLowerCase(newChar)
            }
            keyIndex++;
        } else {
            result += currentChar;
        }
    }
    return result;
}


function isUpperCased(char) {
    return /[A-Z]/g.test(char);
}


function stringToLowerCase(text) {
    return text.toLowerCase()
}

export { encrypt, decrypt }