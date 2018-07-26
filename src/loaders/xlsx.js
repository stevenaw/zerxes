const XLSX = require('xlsx');

class XlsxLoader {
  loadFile(filePath) {
    const workbook = XLSX.readFile(filePath);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    const sheetContent = XLSX.utils.sheet_to_json(worksheet, { header: 'A' });
    return sheetContent.map(row => ({
      url: row.A.trim(),
      expectedRedirect: row.B.trim(),
      maxHops: row.C ? (parseInt(row.C.trim(), 10) || undefined) : undefined
    }));
  }
}

module.exports = XlsxLoader;