//Encryption 
export default function cryptaGener(text, key, direction, separator) {
    let alphabet = "abcdefjhijklmnopqrstuvwxyz";
    
    let keyIndex = 0;
    let processedText = "";
    let lowerKey = key.toLowerCase();
    
    for (let i = 0; i < text.length; i++) {
        
        // Test the case of a character
        let isUpperCased = /[A-Z]/g.test(text[i]);
        
        let character = text[i].toLowerCase();

        if (!alphabet.includes(character)) {
            processedText += character
        } else {
            
            let keyChar = lowerKey[keyIndex % 
            lowerKey.length];
            
            console.log(keyIndex % lowerKey.length)
            keyIndex += 1;

            let offset, charIndex, newCharIndex;
            offset = alphabet.indexOf(keyChar);
            charIndex = alphabet.indexOf(character);
            newCharIndex = (charIndex + offset * direction) % alphabet.length;
            
            if (isUpperCased) {
                console.log(alphabet[newCharIndex])
                
                processedText += stringToUpperCase(alphabet[newCharIndex])
            } else {
            processedText += alphabet[newCharIndex]
            }
        }

    }
    console.log(processedText);
    return processedText
}

function stringToUpperCase(text) {
    return text.toUpperCase()
}