const { closeWithError } = require("./utils");
const fs = require("fs");

const checkFile = (path) => {
  try {
    fs.accessSync(path, fs.constants.F_OK);
  } catch (err) {
    closeWithError(`File "${path}" is not access`);
  }
};

const checkArguments = ({ config, input, output }) => {
  // const { action, shift, input, output } = argv;

  if (!config) {
    closeWithError(
      'Invalid option. Please, enter option "config" (--config or -c). '
    );
  }

  // todo check --config. Config is a string with pattern {XY(-)}n
  // if (config !== 'encode' && action !== 'decode') {
  //   closeWithError('Invalid option. "action" must be "encode" or "decode"');
  // }

  if (input) {
    checkFile(input);
  }

  if (output) {
    checkFile(output);
  }

  return true;
};

module.exports = checkArguments;
