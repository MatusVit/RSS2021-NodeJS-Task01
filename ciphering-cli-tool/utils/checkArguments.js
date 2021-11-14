const { closeWithError } = require("./utils");
const fs = require("fs");

const checkFile = (path) => {
  try {
    fs.accessSync(path, fs.constants.F_OK);
  } catch (err) {
    closeWithError(`File "${path}" is not access`);
  }
};

const checkConfig = (config) => {
  const parsArray = config.split("-");
  parsArray.forEach((arg) => {
    if (!/^(C1|C0|R1|R0|A)$/.test(arg)) {
      closeWithError(
        'Invalid "config" option. The configuration must be a string with the {XY (-)} pattern. Please read the README.'
      );
    }
  });
};

const checkArguments = ({ config, input, output }) => {
  // const { action, shift, input, output } = argv;

  if (config) {
    checkConfig(config);
  } else {
    closeWithError(
      'Invalid option. Please, enter option "config" (--config or -c).'
    );
  }

  if (input) {
    checkFile(input);
  }

  if (output) {
    checkFile(output);
  }

  return true;
};

module.exports = checkArguments;
