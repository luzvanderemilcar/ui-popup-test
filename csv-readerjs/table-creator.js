export default function createTable(...args) {
    const newTable = document.createElement("table");

    const defaultOptions = {
        mutateRow: false,
        mutateColumn: false
    }
    let dataObjectsArray, wrapper, options;

    // process optional third parameter
    if (args.length == 3) {
    [dataObjectsArray, wrapper] = [args[0], args[1]];
    options = Object.assign(defaultOptions, args[2])
    }
    else if (args.length == 2) {
    [dataObjectsArray, wrapper] = args;
        options = defaultOptions
    }

    // handle data filtering for table row and/or column 
    if (options.hasOwnProperty("rowsToStrip")) {
        dataObjectsArray = stripRow(dataObjectsArray, options.rowsToStrip, options.mutateRow);
    }

    if (options.hasOwnProperty("columnsToStrip")) {
        dataObjectsArray = stripColumn(dataObjectsArray, options.columnsToStrip, options.mutateColumn);
    }
    // Finding the value of the headers
    let headerRowArray = Object.keys(dataObjectsArray[0]);

    // Append header row into table element 
    rowCreator(newTable, headerRowArray, true);

    dataObjectsArray.forEach((object, index)=> {
        let rowValuesArray = Object.values(object);

        // append data row into table element for each object
        rowCreator(newTable, rowValuesArray, false, index)
    });
    wrapper.innerHTML = "";
    wrapper.appendChild(newTable);
}

function rowCreator(table, arrayOfValues,...args) {
    
    let isHeaderRow, rowIndex;
    
    if (args.length == 1) {
        isHeaderRow = args[0];
        rowIndex = 0;
    }
    else if (args.length == 2) {
        isHeaderRow = args[0];
        rowIndex = args[1] + 1;
    }
    
    // create a new row element 
    let row = document.createElement("tr");
    row.setAttribute("key", rowIndex+"");
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

// Strip a list of row by indexes
function stripRow(dataObjectsArray, rowsToStrip, isMutableRow) {

    // Condition to prevent row emptying
    if (dataObjectsArray.length == rowsToStrip.length) {
        rowsToStrip.pop();
        console.error("There should have at least one data row remaining inside the table")
    }
    if (isMutableRow) {
        let numberOfRowDeleted = 0;
        rowsToStrip.forEach((index) => {
            dataObjectsArray.splice(index - numberOfRowDeleted - 1, 1)
            numberOfRowDeleted++
        });
        return dataObjectsArray
    } else {
        return dataObjectsArray.filter((dataRow, index) => !rowsToStrip.includes(index + 1));
    }
}


// strip a list of column by header name
function stripColumn(dataObjectsArray, columnsToStrip, isMutableColumn) {

    if (isMutableColumn) {
        dataObjectsArray.forEach(dataRow => {
            for (let column in dataRow) {
                if (columnsToStrip.includes(column)) {
                    delete dataRow[column]
                }
            }
        });

        return dataObjectsArray
    } else {

        return dataObjectsArray.map(dataRow => {

            let objectData = {};
            for (let column in dataRow) {
                if (!columnsToStrip.includes(column)) {
                    objectData[column] = dataRow[column]
                }
            }
            return objectData
        });
    }
}