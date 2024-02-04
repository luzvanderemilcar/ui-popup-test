//import {csvReader, findRowIndexByKeyValue, complexSearch, getRowsFromIndexes, updateRow, addRow, deleteRow, csvFormater} 
import Reader from "./process-csv.js";
import cryptaGener from "/Cipher/cipher.js";
import tableCreator from "./tableCreator.js";

/*/ file to open, read and write 
file = fopen("./aj_members.csv", 3);
str = fread(file, flength(file));
console.log(str);
fwrite(file, content);*/

cryptaGener("Luzvander EMILCAR;28","exposure",1,";")
cryptaGener("pROJsHuiv BBwDwrv;28","exposure",-1,";")

let csvData = `ID;Non;Siyati;Nesans;Vil;Stati;Referans
6;Xtr;YYIBD;1087;Place 4;atyi;Je xnnh`;

let dataObjectsArray = Reader.csvReader(csvData,";");
let row1 = [4,"Jkdb","EOBDKS", "3758","Pjdjjtk", "khsu", "oudnn Mbdjdbn"];
Reader.addRow(dataObjectsArray,row1);
console.table(Reader.getRowsFromIndexes(dataObjectsArray, Reader.complexSearch(dataObjectsArray, 6)));
console.log(Reader.complexSearch(dataObjectsArray, "4"))
console.log(Reader.csvFormater(dataObjectsArray,";"));
console.table(dataObjectsArray)


//select the current wrapper
const tableDisplay = document.querySelector("#table-wrapper");

// create a table from dataArray and append it to a wrapper
tableCreator(dataObjectsArray, tableDisplay);

