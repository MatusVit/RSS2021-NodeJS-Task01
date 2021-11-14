const { Transform } = require("stream");
const caesarCipher = require("../ciphers/caesarCipher");

exports.getTransformStream = (cipherCode) => {
  let cipherFunction = () => {};
  switch (cipherCode) {
    case "C0":
      cipherFunction = (chunk) => caesarCipher(chunk, -1);
      break;
    case "C1":
      cipherFunction = (chunk) => caesarCipher(chunk, 1);
      break;

    default:
      break;
  }

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const chunkStringified = chunk.toString().trim();
      const newChunk = cipherFunction(chunkStringified);
      this.push(newChunk + "\n");
      callback();
    },
  });

  return transformStream;
};
