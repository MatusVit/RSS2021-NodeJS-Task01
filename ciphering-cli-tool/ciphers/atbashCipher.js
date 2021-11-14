const { closeWithError } = require("../utils/utils");

// ASCII code a-z > 097-122, A-Z > 065-090

const alphabetUpArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const alphabetLowArray = "abcdefghijklmnopqrstuvwxyz".split("");
const revAlphabetUpArray = [...alphabetUpArray].reverse();
const revAlphabetLowArray = [...alphabetLowArray].reverse();

const atbashCipher = (inData) => {
  if (!typeof inData === "string") {
    closeWithError("Input Data is not a string");
  }

  const outCodeArray = [...inData].map((char) => {
    const indexLow = alphabetLowArray.indexOf(char);

    if (indexLow >= 0) {
      return revAlphabetLowArray[indexLow];
    }

    const indexUp = alphabetUpArray.indexOf(char);
    if (indexUp >= 0) {
      return revAlphabetUpArray[indexUp];
    }

    return char;
  });

  return outCodeArray.join("");
};

module.exports = atbashCipher;
