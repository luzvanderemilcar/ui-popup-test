import {csvReader, findRowIndexByKeyValue, complexSearch, getRowsFromIndexes, updateRow, addRow, deleteRow, csvFormater} from "./process-csv.js";

/*/ file to open, read and write 
file = fopen("./aj_members.csv", 3);
str = fread(file, flength(file));
console.log(str);
fwrite(file, content);*/

let csvData = `ID;Non;Siyati;Nesans;Ville;Stati;Referans
6;Xtr;YYIBD;1087;Place 4;atyi,Je xnnh`;

let dataObjectsArray = csvReader(csvData,";");
let row1 = [4,"Jkdb","EOBDKS", "3758","Pjdjjtk", "khsu", "oudnn Mbdjdbn"];
addRow(dataObjectsArray,...row1);
console.table(getRowsFromIndexes(dataObjectsArray, complexSearch(dataObjectsArray, 6)));
console.log(complexSearch(dataObjectsArray, "4"))
console.log(csvFormater(dataObjectsArray,";"));
