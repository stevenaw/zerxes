const zerxes = require('./src/zerxes');
const argv = require('yargs')
  .option('in', {
    describe: 'input file'
  })
  .option('out', {
    describe: 'output file'
  })
  .option('maxHops', {
    describe: 'maximum valid redirect hop count'
  })
  .demandOption(['in', 'out'], 'Please provide both in and out arguments to work with this tool')
  .help()
  .argv;

zerxes(Object.assign(
  {},
  argv,
  {
    err: console.log,
  }
)).then(console.log);