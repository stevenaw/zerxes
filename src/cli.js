const ZerxesCore = require('./zerxes-core');
const Loaders = require('./loaders');
const Reporters = require('./reporters');
const utils = require('./utils');

const globalDefaults = {
  maxHops: 10
};

module.exports = options => {
  const inputFile = options.in;
  const outputFile = options.out;
  const globalCliParams = {
    maxHops: parseInt(options.maxHops, 10) || undefined
  }

  const zerxes = new ZerxesCore();
  const loaders = new Loaders();
  const reporters = new Reporters();

  const loader = loaders.getLoader(inputFile);
  const reporter = reporters.getReporter(outputFile);

  const loadedTestCases = loader.loadFile(inputFile);
  const testCases = loadedTestCases.map(testCase => 
    utils.mergeShallowOmitUndefined(globalDefaults, globalCliParams, testCase ));

  const hopsToDestination = testCases.map((testCase) =>
    zerxes.verifyRedirect(testCase)
      .then(
        found => found.hopCount,
        rejected => 0
      ).catch(err => {
        console.log(err);
        return 0;
      })
      .then(hopCount => Object.assign(
        {},
        testCase,
        {
          success: !!hopCount,
          hops: hopCount || 0
        }
      ))
  );

  return Promise.all(hopsToDestination).then(results => {
    console.log(results);
    reporter.writeReport(outputFile, results);
  });
};
