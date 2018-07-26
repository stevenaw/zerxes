const mergeShallowOmitUndefined = (...args) => {
  const result = {};

  for (let i = 0; i < args.length; i++) {
    for (const propName in args[i]) {
      if (args[i][propName] !== undefined) {
        result[propName] = args[i][propName];
      }
    }
  }

  return result;
};

module.exports = { mergeShallowOmitUndefined };