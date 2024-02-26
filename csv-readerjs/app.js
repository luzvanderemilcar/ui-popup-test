//import {csvReader, findRowIndexByKeyValue, complexSearch, getRowsFromIndexes, updateRow, addRow, deleteRow, csvFormater} 
import Reader from "./process-csv.js";
import cryptaGener from "/Cipher/cipher1.js";
import createTable from "./table-creator.js";

/*/ file to open, read and write 
file = fopen("./aj_members.csv", 3);
str = fread(file, flength(file));
console.log(str);
fwrite(file, content);*/


let data = "Luzvander EMILCAR;28";

let dataEncrypted = cryptaGener(data, "exposure", 1, ";")
cryptaGener(dataEncrypted, "exposure", -1, ";")

let csvData = `Id;Non;Siyati;Nesans;Vil;Stati;Referans
6;Xtr;YYIBD;1087;Place 4;atyi;Je xnnh`;

let dataObjectsArray = Reader.csvReader(csvData, ";");
let row2 = [4, "Jkdb", "EOBDKS", "3758", "Pjdjjtk", "khsu", "oudnn Mbdjdbn"];
let row3 = [7, "Job", "EOBDKS", "5589", "jelznn", "prodd", "oudnn Mbdjdbn"];
Reader.addRow(dataObjectsArray, row2);
Reader.addRow(dataObjectsArray, row3);
let row4 = [8, "jero", "EBOOKS", "6830", "matudv", "prvbw", "bute Rayen"];
Reader.addRow(dataObjectsArray, row4);

console.table(Reader.getRowsFromIndexes(dataObjectsArray, Reader.complexSearch(dataObjectsArray, "7")));

console.log(Reader.complexSearch(dataObjectsArray, "4"))
console.log(Reader.csvFormater(dataObjectsArray, ";"));


//select the current wrapper
const tableDisplay = document.querySelector("#table-wrapper");

// create a table from a array of objects (first parameter) and append it to a wrapper (second)
createTable(dataObjectsArray, tableDisplay);

const tableDisplay2 = document.querySelector("#table2-wrapper");

createTable(dataObjectsArray, tableDisplay2, { rowsToStrip: [1, 2], mutateRow: false, columnsToStrip: ["Nesans", "Vil", "Siyati", "Referans"], mutateColumn: true });

console.table(dataObjectsArray)

const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", searchDataByInput);

function searchDataByInput(e) {
    // get input value end remove space around
  const userInput = searchForm.elements.searchdata.value.trim();
let strictFilterSearch = searchForm.elements.filtercheck.checked;
    let matchedDataIndex = Reader.complexSearch(dataObjectsArray, userInput,{"strictFilterSearch" : strictFilterSearch});
    
    let matchedDataObjectsArray = Reader.getRowsFromIndexes(dataObjectsArray, ...matchedDataIndex);
    
   try {
       createTable(matchedDataObjectsArray,tableDisplay2)
   } catch(error) {
       tableDisplay2.innerHTML = `<strong>${userInput}</strong> Not Found`;
       console.error(error)
   }
    
    e.preventDefault()
}

const formRegisterContainer = document.querySelector("#register-form");

function formRegisterCreator(obj) {
    const formRegisterElement = document.createElement("form");
    let fieldNameList = Object.keys(obj);
    
    fieldNameList.forEach(key => {
        let labelElement = document.createElement("label");
        let inputField = document.createElement("input");
        formRegisterElement.appendChild(labelElement);
        formRegisterElement.appendChild(inputField)
    });
    const submitButton = document.createElement("button","Submit");
    submitButton.setAttribute("type", "submit");
    formRegisterElement.appendChild(submitButton);
    
    formRegisterContainer.append(formRegisterElement)
}

formRegisterCreator(dataObjectsArray[0])