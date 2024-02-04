//Encryption 
export default function cryptaGener(text, key, direction, separator) {
    let alphabet = "abcdefjhijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ";
    
    let keyIndex = 0;
    let processedText = "";

    for (let i = 0; i < text.length; i++) {
        
        // Test the case of a character
        
        let character = text[i].toLowerCase();

        if (!alphabet.includes(character)) {
            processedText += character
        } else {
            
            let keyChar = key[keyIndex % 
            key.length];
            keyIndex += 1;

            let offset, charIndex, newCharIndex;
            offset = alphabet.indexOf(keyChar);
            charIndex = alphabet.indexOf(character);
            newCharIndex = (charIndex + offset * direction) % alphabet.length;
            processedText += alphabet[newCharIndex]
        }

    }
    console.log(processedText);
    return processedText
}

function uppercase(text) {
    return text.toUpperCase()
}