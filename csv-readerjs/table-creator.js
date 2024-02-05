export default function tableCreator(...args) {
const newTable = document.createElement("table");
   
 let dataObjectsArray, wrapper, options;
if (args.length == 3) {
    [dataObjectsArray, wrapper, options] = args;
}
if (options.hasOwnProperty("columnsToStrip")) {
    dataObjectsArray = stripColumn (dataObjectsArray, options.columnsToStrip);
}


// Finding the value of the header
let headerRowArray = Object.keys(dataObjectsArray[0]);

// create the header row
rowCreator(newTable, headerRowArray, true);

dataObjectsArray.forEach(object => {
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

function stripRow(arr) {
    mainArray = arr.slice()
    mainArray.forEach(dataRow => {
        for (let column in dataRow) {
            if (arr.includes(column)) {
                delete dataRow[column]
            }
        }
    });
    return mainArray;
}

function stripColumn(dataObjectsArray, columnsToStrip) {
    let mainArray = dataObjectsArray.slice()
    mainArray.forEach(dataRow => {
        for (let column in dataRow) {
            if (columnsToStrip.includes(column)) {
               delete dataRow[column]
            }
        }
    });
    return mainArray;
}
