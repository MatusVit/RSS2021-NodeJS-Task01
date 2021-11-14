const fs = require("fs");
const { get } = require("http");
// const minimist = require("minimist");
const { pipeline } = require("stream");
const { getTransformStream } = require("./streams/getTransformStream");

const checkArguments = require("./utils/checkArguments");
const { closeWithError, getArgsObject } = require("./utils/utils");

const argsObject = getArgsObject({
  alias: {
    c: "config",
    i: "input",
    o: "output",
  },
});
console.log("argsObject=", argsObject);

if (checkArguments(argsObject)) {
  const { config, input, output } = argsObject;

  const inputStream = input ? fs.createReadStream(input) : process.stdin;
  const outputStream = output
    ? fs.createWriteStream(output, { flags: "a+" })
    : process.stdout;

  const configArray = config.split("-");
  console.log(">>>> configArray=", configArray);

  const transformStreamArray = configArray.map((cipherCode) =>
    getTransformStream(cipherCode)
  );

  console.log(">>>> transformStreamArray=", transformStreamArray);

  pipeline(inputStream, ...transformStreamArray, outputStream, (error) => {
    if (error) {
      closeWithError(error.message);
    } else console.log("Done!");
  });
} else {
  closeWithError("No required arguments passed.");
}
