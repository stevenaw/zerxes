const XLSX = require('xlsx');

class XlsxReporter {
  writeReport(fileName, output) {
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(output);

    XLSX.utils.book_append_sheet(workbook, sheet, "Results");

    XLSX.writeFile(workbook, fileName);
  }
}

module.exports = XlsxReporter;