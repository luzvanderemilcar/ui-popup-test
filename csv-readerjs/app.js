//import {csvReader, findRowIndexByKeyValue, complexSearch, getRowsFromIndexes, updateRow, addRow, deleteRow, csvFormater} 
import Reader from "./process-csv.js";
import {encrypt, decrypt} from "/Cipher/cipher.js";
import createTable from "./table-creator.js";

let data = "Luzvander EMILCAR;28";

let dataEncrypted = encrypt(data, "exposure")
decrypt(dataEncrypted, "exposure")

$("h1").html("Suprise");

function getDataFromFile() {
    let csvLink = $('link[data-src]');
    let src = csvLink.attr('data-src');
    $.get(src, (fileContent) => {
    
        let dataObjectsArray = Reader.csvReader(decrypt(fileContent, "exposition"), ";");
        console.table(dataObjectsArray)
        let row2 = [4, "Jkdb", "EOBDKS", "3758", "Pjdjjtk", "khsu", "oudnn Mbdjdbn"];
        let row3 = [7, "Job", "EOBDKS", "5589", "jelznn", "prodd", "oudnn Mbdjdbn"];
        Reader.addRow(dataObjectsArray, row2);
        //Reader.addRow(dataObjectsArray, row3);
        let row4 = [8, "jero", "EBOOKS", "6830", "matudv", "prvbw", "bute Rayen"];
        Reader.addRow(dataObjectsArray, row4);

        console.table(Reader.getRowsFromIndexes(dataObjectsArray, Reader.complexSearch(dataObjectsArray, "7")));

        console.log(Reader.complexSearch(dataObjectsArray, "4"))
        console.log(Reader.csvFormater(dataObjectsArray, ";"));


        //select the current wrapper

        const tableDisplay2 = document.querySelector("#table2-wrapper");

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

        const formRegisterContainer = document.querySelector("#register-form");
        const formRegisterElement = document.createElement("form");

        function formRegisterCreator(obj) {
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

            formRegisterContainer.append(formRegisterElement);
            formRegisterElement.addEventListener("submit", addRow)
        }

        formRegisterCreator(dataObjectsArray[0]);

        function addRow(e) {
            e.preventDefault();
            let mainForm = e.target;
            let idForm = mainForm.getAttribute("id");
            let inputFields = document.querySelector(`#${idForm} input`);
        }
    });
}

getDataFromFile();