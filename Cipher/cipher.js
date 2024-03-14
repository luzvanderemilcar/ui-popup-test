//Encryption 

function encrypt(str, key, direction = 1) {
    let keyIndex = 0; // KeyIndex initial value
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Regex for alphabet character 
    let abRegex = /[A-Z]/i;

    //Accumulator 
    let result = "";

    // Iterator for text processing
    for (let i = 0; i < str.length; i++) {

        let currentChar, keyChar, upperCasedKeyChar, upperCasedCurrentChar, charIndex, offset;

        currentChar = str[i];

        // keyChar depending on key length and keyIndex
        keyChar = key[keyIndex % key.length];

        // Uppercase the keyChar 
        upperCasedKeyChar = keyChar.toUpperCase();
        upperCasedCurrentChar = currentChar.toUpperCase();
        charIndex = alphabet.indexOf(upperCasedCurrentChar);
        offset = alphabet.indexOf(upperCasedKeyChar);

        // Test if the current character is type alpha
        if (abRegex.test(upperCasedCurrentChar)) {
            let newChar;
            let newCharIndex = (charIndex + offset * direction) % alphabet.length;

            //Test the sign of the new character index is negative
            if (newCharIndex < 0) {
                newCharIndex += alphabet.length;
            }

            newChar = alphabet[newCharIndex];

            //test the case of the processed character
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

// decryption
function decrypt(string, key) {
    return encrypt(string, key, -1)
}

function isUpperCased(char) {
    return /[A-Z]/g.test(char);
}


function stringToLowerCase(text) {
    return text.toLowerCase()
}

export { encrypt, decrypt }