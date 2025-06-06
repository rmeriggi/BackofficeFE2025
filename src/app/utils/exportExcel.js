import ExcelJS from 'exceljs'

const sheetName = "Hoja Nro1";

    async function generateExcel(header, properties, sheetName,  array){
    var workbook = new ExcelJS.Workbook();
    var sheet = workbook.addWorksheet(sheetName);
    sheet.addRow(
        header
    ).commit();
    sheet.getRow(1).font =  { bold: true, name: "Calibri" };
    array.forEach((element) => {
        let row = [];
        properties.forEach((itemProperty)=>{
            row[row.length] = element[itemProperty];
        })
        sheet.addRow(
            row
        ).commit()
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
} 

export const getExcel = (values, nameExcel) => {
    const {header, properties, array} = values
    generateExcel(header, properties, sheetName, array).then(response => {
        const file = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const fileURL = URL.createObjectURL(file);
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = fileURL;
        a.download = nameExcel
        a.click();
        document.body.removeChild(a)
    })
}