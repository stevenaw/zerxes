const XLSX = require('xlsx');

class XlsxLoader {
  loadFile(filePath) {
    const workbook = XLSX.readFile(filePath);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
	
    const sheetContent = XLSX.utils.sheet_to_json(worksheet, { header: 'A' });
    
	console.log(sheetContent);
	return sheetContent.map(row => {
		let maxHops = Number.isInteger(row.C) ?
						row.C :
						(parseInt(row.C.toString().trim(), 10) || undefined);
						
		return {
		  url: row.A.trim(),
		  expectedRedirect: row.B.trim(),
		  maxHops: maxHops
		}
	});
  }
}

module.exports = XlsxLoader;