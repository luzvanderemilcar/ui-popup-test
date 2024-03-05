//Encryption 
export default function cryptaGener(text, key, direction, separator) {
    let alphabet = "abcdefjhijklmnopqrstuvwxyz";

    let keyIndex = 0;
    let processedText = "";
    let lowerKey = key.toLowerCase();

    for (let i = 0; i < text.length; i++) {

        // Test the case of a character
        let isUpperCased = /[A-Z]/g.test(text[i]);

        let mainChar = text[i].toLowerCase();

        if (alphabet.includes(mainChar)) {
            let keyChar = lowerKey[keyIndex % lowerKey.length]
            keyIndex += 2;

            let offset, charIndex, newCharIndex, newChar;

            offset = alphabet.lastIndexOf(keyChar);
            charIndex = alphabet.indexOf(mainChar);

            newCharIndex = (charIndex + offset * direction) % alphabet.length;
            
            if (newCharIndex < 0) {
                newCharIndex += alphabet.length
            }

            newChar = alphabet[newCharIndex];
            console.log(newCharIndex, newChar);

            if (isUpperCased) {
                processedText += stringToUpperCase(newChar)
            } else {
                processedText += newChar
            }
        } else {
            processedText += mainChar
        }

    }
    console.log(processedText)
    return processedText
}


function isUpperCased(char) {
    return /[A-Z]/g.test(char);
}

function stringToUpperCase(char) {
    return char.toUpperCase()
}