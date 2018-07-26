const path = require('path');
const XlsxReporter = require('./xlsx');

const xlsx = new XlsxReporter();
const registry = {};

registry['xlsx'] = xlsx;
registry['csv'] = xlsx;

class Reporters {
  getReporter(fileName) {
    const extension = path.extname(fileName).substring(1);
    const reporter = registry[extension];

    if (!reporter) {
      throw new Error('Unsupported file type');
    } else {
      return reporter;
    }
  }
}

module.exports = Reporters;