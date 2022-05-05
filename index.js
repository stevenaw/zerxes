#!/usr/bin/env node
import zerxes from './src/zerxes.js';
import yargs from 'yargs';

const argv = yargs
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
  .option('concurrency', {
    describe: 'maximum concurrent tests',
    type: 'number'
  })
  .help()
  .argv;

await zerxes(Object.assign(
  {},
  argv,
  {
    err: console.log,
    testCaseComplete: (url, success) => console.log(`${!!success ? 'PASS' : 'FAIL'} ${url}`)
  }
)).then(console.log);