export const repeatedChars = Array.from({ length: 26 + 26 + 10 }, (_, i) => {
    if (i < 26) {
        const lowerChar = String.fromCharCode(97 + i);
        const upperChar = String.fromCharCode(65 + i);
        return `${lowerChar}${lowerChar}${lowerChar}|${upperChar}${upperChar}${upperChar}|${lowerChar}${upperChar}${lowerChar}|${upperChar}${lowerChar}${upperChar}`;
    } else if (i < 26 + 26) {
        const index = i - 26;
        const upperChar = String.fromCharCode(65 + index);
        return upperChar + upperChar + upperChar;
    } else {
        return String(i - 26 - 26) + String(i - 26 - 26) + String(i - 26 - 26);
    }
}).join('|');
  
export const tldRegex = new RegExp(`\\.(${repeatedChars})$`, 'i');

export const basicEmailValidationRegex = new RegExp(`/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i`);