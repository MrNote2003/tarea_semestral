import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName) => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Reporte');
    const excelBuffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(file, `${fileName}.xlsx`);
}