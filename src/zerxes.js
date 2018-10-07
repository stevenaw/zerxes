const PQueue = require('p-queue');
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
  const testCaseComplete = options.testCaseComplete;
  const concurrency = options.concurrency || 20;
  const globalCliParams = {
    maxHops: parseInt(options.maxHops, 10) || undefined
  };

  const zerxes = new ZerxesCore();
  const loaders = new Loaders();
  const queue = new PQueue({ concurrency: concurrency });

  const loader = loaders.getLoader(inputFile);
  const loadedTestCases = loader.loadFile(inputFile);
  const testCases = loadedTestCases.map(testCase => 
    utils.mergeShallowOmitUndefined(globalDefaults, globalCliParams, testCase ));

  const promiseFactory = testCases.map((testCase, i) =>
    () => zerxes.verifyRedirect(testCase)
      .then(
        found => found.hopCount,
        rejected => 0
      ).catch(err => {
        if (options.err) {
          options.err(err);
        }
        return 0;
      })
      .then(hopCount => {
        if (testCaseComplete) {
          testCaseComplete(testCase.url, !!hopCount);
        }

        return Object.assign(
          {},
          testCase,
          {
            id: i + 1,
            success: !!hopCount,
            hops: hopCount || 0
          }
        )
      })
  );

  return queue.addAll(promiseFactory).then(results => {
    const reporters = new Reporters();
    const reporter = reporters.getReporter(outputFile);
    reporter.writeReport(outputFile, results);

    return results;
  });
};
