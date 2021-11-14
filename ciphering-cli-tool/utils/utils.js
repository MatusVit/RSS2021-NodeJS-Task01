exports.closeWithError = (massage) => {
  process.stderr.write(massage);
  process.exit(1);
};

const isOption = (arg) => /^(-|--)[^-]/.test(arg);

exports.getArgsObject = ({ alias }) => {
  const argsArray = process.argv.slice(2);

  const argsObject = argsArray.reduce((argsObject, arg, index, array) => {
    if (!isOption(arg)) return argsObject;

    if (arg.slice(0, 2) === "--") {
      const fullName = arg.slice(2);
      if (
        Object.values(alias).includes(fullName) &&
        !isOption(array[index + 1])
      ) {
        if (argsObject[fullName])
          this.closeWithError(
            `Invalid option. Argument --${fullName} is duplicated`
          );
        argsObject[fullName] = array[index + 1];
      }
    } else {
      const aliasKey = arg.slice(1);
      if (
        Object.keys(alias).includes(aliasKey) &&
        !isOption(array[index + 1])
      ) {
        if (argsObject[alias[aliasKey]])
          this.closeWithError(
            `Invalid option. Argument -${aliasKey} is duplicated`
          );
        argsObject[alias[aliasKey]] = array[index + 1];
      }
    }
    return argsObject;
  }, {});

  return argsObject;
};
