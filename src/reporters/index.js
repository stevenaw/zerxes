import path from 'path';
import XlsxReporter from './xlsx.js';

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

export default Reporters;