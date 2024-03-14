//import {csvReader, findRowIndexByKeyValue, complexSearch, getRowsFromIndexes, updateRow, addRow, deleteRow, csvFormater} 
import Reader from "./process-csv.js";
import { encrypt, decrypt } from "/Cipher/cipher.js";
import createTable from "./table-creator.js";

$("h1").html("Suprise");

const formRegisterContainer = document.querySelector("#register-form");
const tableDisplay2 = document.querySelector("#table2-wrapper");


function getDataFromFile() {
    let csvLink = $('link[data-src]');
    let src = csvLink.attr('data-src');
    let keyDecypt = "endurer";
    $.get(src, (fileContent) => {

        let dataObjectsArray = Reader.csvReader(decrypt(fileContent, keyDecypt), ";");
        let row2 = [4, "Jkdb", "EOBDKS", "3758", "Pjdjjtk", "khsu", "oudnn Mbdjdbn"];
        let row3 = [7, "Job", "EOBDKS", "5589", "jelznn", "prodd", "oudnn Mbdjdbn"];
        Reader.addRow(dataObjectsArray, row2);
        //Reader.addRow(dataObjectsArray, row3);
        let row4 = [8, "jero", "EBOOKS", "6830", "matudv", "prvbw", "bute Rayen"];
        Reader.addRow(dataObjectsArray, row4);
        console.table(dataObjectsArray)

        /*console.table(Reader.getRowsFromIndexes(dataObjectsArray, Reader.complexSearch(dataObjectsArray, "7")));

        console.log(Reader.complexSearch(dataObjectsArray, "4"))
        console.log(Reader.csvFormater(dataObjectsArray, ";"));


        *///select the current wrapper


      createTable(dataObjectsArray, tableDisplay2, { rowsToStrip: [1, 2], mutateRow: false, columnsToStrip: ["Nesans", "Vil", "Siyati", "Referans"], mutateColumn: true });

        console.table(dataObjectsArray)
        
        const searchForm = document.querySelector("#search-form");

        searchForm.addEventListener("submit", searchDataByInput);

        function searchDataByInput(e) {
            // get input value end remove space around
            const userInput = searchForm.elements.searchinput.value.trim();
            let strictFilterSearch = searchForm.elements.filtercheck.checked;
            let matchedDataIndex = Reader.complexSearch(dataObjectsArray, userInput, { "strictFilterSearch": strictFilterSearch });

            let matchedDataObjectsArray = Reader.getRowsFromIndexes(dataObjectsArray, ...matchedDataIndex);

            if (matchedDataObjectsArray.length > 0) {
                createTable(matchedDataObjectsArray, tableDisplay2)
            } else {
                tableDisplay2.innerHTML = `<p><strong>${userInput}</strong> Not Found !</p><p>Please try another input</p>`;
            }

            e.preventDefault()
        }


        function formRegisterCreator(obj) {
            let formRegisterElement = document.createElement("form");

            let fieldNameList = Object.keys(obj);

            fieldNameList.forEach(key => {
                let labelElement = document.createElement("label");
                labelElement.innerHTML = key
                let inputField = document.createElement("input");
                inputField.setAttribute("name", key)
                formRegisterElement.appendChild(labelElement);
                formRegisterElement.appendChild(inputField)
            });

            const submitButton = document.createElement("button");
            submitButton.setAttribute("type", "submit");
            submitButton.textContent = "Add Row"
            formRegisterElement.appendChild(submitButton);

            formRegisterElement.addEventListener("submit", addRowFromForm)
            formRegisterContainer.append(formRegisterElement);
        }

        formRegisterCreator(dataObjectsArray[0]);

        function addRowFromForm(e) {
            //Find all the input field
            let inputFields = e.target.getElementsByTagName("input");

            let row = {};

            for (let i = 0; i < inputFields.length; i++) {
                // set object property from input field
                let inputField = inputFields[i];
                row[inputField.name] = inputField.value.trim()
            }

            try {
                Reader.addRow(dataObjectsArray, Object.values(row));
                console.table(dataObjectsArray)
            }
            catch (e) {
                console.log(e)
            }
            e.preventDefault();
        }
    });
}

getDataFromFile();
// promise 
let myArray = ["Jan", "Feb"]
async function retriever(data) {
    let isSatisfied = false;
    isSatisfied = await data.length > 2;
    
    if (isSatisfied) {
        console.log(data)
    }
}

retriever(myArray);

myArray.push("Mar")

let isGood = new Promise((resolve, reject) => {
    if (myArray.length > 2) {
        
        resolve(myArray);
    } else {
        console.log('Not yet')
    }
});