import {csvReader, findRowIndexByKeyValue, complexSearch, getRowsFromIndexes, updateRow, addRow, deleteRow, csvFormater} from "./process-csv.js";

/*/ file to open, read and write 
file = fopen("./aj_members.csv", 3);
str = fread(file, flength(file));
console.log(str);
fwrite(file, content);*/

let csvData = `ID;Non;Siyati;Batèm;Kongregasyon;Stati;Referans
3;Luzvander;EMILCAR;"2015";Deschaos;aktif;Jean Ricemane EMILCAR
5;Jean Ricemane;EMILCAR;2014;Deschaos;aktif;Luzvander EMILCAR`;

let dataObjectsArray = csvReader(csvData,";");
let marketon = [4,"Marketon","JEAN-CHARLES", "-","Deschaos", "aktif", "Markessia JEAN-CHARLES"];
addRow(dataObjectsArray,...marketon);
console.table(getRowsFromIndexes(dataObjectsArray, complexSearch(dataObjectsArray, 5)));
console.log(complexSearch(dataObjectsArray, "Marketon"))
console.log(csvFormater(dataObjectsArray,";"));
