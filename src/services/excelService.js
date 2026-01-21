import * as XLSX from 'xlsx';

/**
 * Flattens a nested JSON object into a single depth object.
 * @param {Object} obj The object to flatten.
 * @param {String} prefix The prefix for keys (used for recursion).
 * @returns {Object} Flattened object.
 */
export const flattenObject = (obj, prefix = '') => {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};

/**
 * Converts JSON data to an Excel buffer.
 * @param {Array} jsonData The JSON data to convert.
 * @param {String} sheetName The name of the sheet.
 * @returns {Blob} The Excel file as a Blob.
 */
export const generateExcel = (jsonData, sheetName = 'Sheet1') => {
  // Ensure data is an array
  const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
  
  // Flatten data for better Excel representation
  const flattenedData = dataArray.map(item => flattenObject(item));

  const worksheet = XLSX.utils.json_to_sheet(flattenedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Generate buffer
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
};

/**
 * Triggers a download of the Excel file.
 * @param {Blob} buffer The Excel file buffer.
 * @param {String} filename The name of the file to download.
 */
export const downloadExcel = (buffer, filename) => {
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.xlsx`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
