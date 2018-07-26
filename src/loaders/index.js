const path = require('path');
const XlsxLoader = require('./xlsx');

const xlsx = new XlsxLoader();
const registry = {};

registry['xlsx'] = xlsx;
registry['csv'] = xlsx;

class Loaders {
  getLoader(fileName) {
    const extension = path.extname(fileName).substring(1);
    const loader = registry[extension];

    if (!loader) {
      throw new Error('Unsupported file type');
    } else {
      return loader;
    }
  }
}

module.exports = Loaders;