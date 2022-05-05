import path from 'path';
import XlsxLoader from './xlsx.js';

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

export default Loaders;