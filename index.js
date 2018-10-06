#!/usr/bin/env node
const zerxes = require('./src/zerxes');
const argv = require('yargs')
  .option('in', {
    describe: 'input file',
    type: 'string',
    demandOption: true
  })
  .option('out', {
    describe: 'output file',
    type: 'string',
    demandOption: true
  })
  .option('maxHops', {
    describe: 'maximum valid redirect hop count',
    type: 'number'
  })
  .help()
  .argv;

zerxes(Object.assign(
  {},
  argv,
  {
    err: console.log,
    testCaseComplete: (url, success) => console.log(`${!!success ? 'PASS' : 'FAIL'} ${url}`)
  }
)).then(console.log);