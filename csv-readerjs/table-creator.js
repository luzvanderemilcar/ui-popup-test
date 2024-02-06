export default function tableCreator(...args) {
const newTable = document.createElement("table");
   
 let dataObjectsArray, wrapper, options;
if (args.length == 3) {
    [dataObjectsArray, wrapper, options] = args;
} 
else if (args.length == 2) {
    [dataObjectsArray, wrapper] = args;
    options = {
        
    }
}

let processedDataObjectsArray = dataObjectsArray.map(obj => obj);

if (options.hasOwnProperty("columnsToStrip")) {
    processedDataObjectsArray = stripColumn (processedDataObjectsArray, options.columnsToStrip);
}
console.table(dataObjectsArray)
console.table(processedDataObjectsArray)

if (options.hasOwnProperty("rowsToStrip")) {
    processedDataObjectsArray = stripRow (processedDataObjectsArray, options.rowsToStrip);
}

// Finding the value of the header
let headerRowArray = Object.keys(processedDataObjectsArray[0]);

// create the header row
rowCreator(newTable, headerRowArray, true);

processedDataObjectsArray.forEach(object => {
    let rowValuesArray = Object.values(object);
    
    // create data a data row
    rowCreator(newTable, rowValuesArray)
});

wrapper.appendChild(newTable);
}

function rowCreator(table, arrayOfValues, isHeaderRow) {
    
    // create a new row element 
    let row = document.createElement("tr");
    let rowDataElements = arrayOfValues.forEach((value) => {
        let valueTag;
        
        if (isHeaderRow) {
            valueTag = document.createElement("th");
        } else {
            valueTag = document.createElement("td");
        }
        
        // insert data into cell
        valueTag.textContent = value;
        row.appendChild(valueTag)
    });
    //Add the new row to the table
    table.appendChild(row);
}

function stripRow(dataObjectsArray, rowsToStrip) {
    return dataObjectsArray.filter((dataRow, index)=> !rowsToStrip.includes(index + 1));
}

function stripColumn(dataObjectsArray, columnsToStrip) {
    dataObjectsArray.forEach(dataRow => {
        for (let column in dataRow) {
            if (columnsToStrip.includes(column)) {
               delete dataRow[column]
            }
        }
    });
 return dataObjectsArray;
}
