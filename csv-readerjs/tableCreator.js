export default function tableCreator(dataObjectsArray, wrapper) {
const newTable = document.createElement("table");

let headerRowArray = Object.keys(dataObjectsArray[0]);

// create the header row
rowCreator(newTable, headerRowArray, true);

dataObjectsArray.forEach(object => {
    let rowValuesArray = Object.values(object);
    
    // create data row
    rowCreator(newTable, rowValuesArray)
});

wrapper.appendChild(newTable);
}

function rowCreator(table, arrayOfValues, isHeaderRow) {
    let row = document.createElement("tr");
    let rowDataElements = arrayOfValues.forEach((value) => {
        let valueTag;
        if (isHeaderRow) {
            valueTag = document.createElement("th");
        } else {
            valueTag = document.createElement("td");
        }
        valueTag.textContent = value;
        row.appendChild(valueTag)
    })
    table.appendChild(row);
}
