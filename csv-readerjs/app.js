import {reader, searchIndexByKey, findRows, updateValue, csvFormater} from "./process-csv.js";

/*/ file to open, read and write 
file = fopen("./aj_members.csv", 3);
str = fread(file, flength(file));
console.log(str);
fwrite(file, content);*/

let csvData = `ID,Non,Siyati,Batèm,Kongregasyon,Stati,Referans
3,Luzvander,EMILCAR,2015,Deschaos,aktif,Jean Ricemane EMILCAR
5,Jean Ricemane,EMILCAR,2014,Deschaos,aktif,Luzvander EMILCAR`;

let dataArray = reader(csvData);
console.log(csvFormater(dataArray));