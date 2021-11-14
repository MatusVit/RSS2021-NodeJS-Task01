const { closeWithError } = require("../utils/utils");

// ASCII code a-z > 097-122, A-Z > 065-090
const lettersAmount = 26;

const caesarCipher = (inData, shift) => {
  if (!typeof inData === "string") {
    closeWithError("Input Data is not a string");
  }

  let shiftAmount = shift % lettersAmount;
  if (shift < 0) shiftAmount += 26;

  const outCodeArray = [...inData].map((char) => {
    const charCode = char.charCodeAt(0);
    if (charCode > 64 && charCode < 91) {
      return ((charCode - 65 + shiftAmount) % lettersAmount) + 65;
    }
    if (charCode > 96 && charCode < 123) {
      return ((charCode - 97 + shiftAmount) % lettersAmount) + 97;
    }
    return charCode;
  });

  return String.fromCharCode(...outCodeArray);
};

module.exports = caesarCipher;
