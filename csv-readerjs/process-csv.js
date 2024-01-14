//Read csv file data with a specific separator
function reader(...args) {
    let text, separator;
    
   // Default column separator to ","
    if (args.length == 1) {
        [text,separator] = [args[0], ","]
    }
    else if (args.length == 2) {
            [text,separator] = args
    }
    
    let data = text.split("\n")
    let header = data[0].split(separator);
    let dataArray = [];
    for (let i = 1; i < data.length; i++) {
        let row = data[i].split(separator);
        dataArray[i] = {};
        for (let j = 0; j < row.length; j++) {
            dataArray[i][header[j]] = row[j];
        }
    }
    return dataArray.slice(1,dataArray.length);
}

//Search a row with key-value pair, returns index
function searchIndexByKey(dataArray,...args) {
    
        let key, keyValue;
        // default search key to "ID"
        if (args.length == 1) {
            [key, keyValue] = ["ID", args[0]];
        }
        else if (args.length == 2) {
            [key, keyValue] = args;
        }
        let idx;
        let i = 0;
        let indexFound = false;
        while (!indexFound && i < dataArray.length) {
            let dataRow = dataArray[i];
        for (let objKey in dataRow) {
            if (objKey == key && dataRow[objKey] == keyValue) {
                idx = i;
                indexFound = true;
            }
        }
            i++;
        }
        if (indexFound) {
            return idx
        } else {
            console.log("Record not found")
        }
}

//Find multiple? rows that match key-value pair
function findRows(dataArray, key, keyValue) {
    return dataArray.filter(row => {
        return row[key] == keyValue
    })
}

// Update the key-value pair of a row with specific idValue
function updateRow(dataArray, idValue, key, keyValue) {

    let index = searchIndexByKey(dataArray,idValue);
    if (typeof index == "number") {
        if (dataArray[index].hasOwnProperty(key)) {
            dataArray[index][key] = keyValue
        } else {
            console.log(`Property ${key} not found`)
        }
        return [dataArray[index]]
    }
}

function addRow(dataArray,...args) {
    let headerRow = Object.keys(dataArray[0]);
    if (args.length == headerRow.length) {
        let dataRow = {};
        for (let i = 0; i < headerRow.length; i++) {
            dataRow[headerRow[i]] = args[i]
        }
        dataArray.push(dataRow)
    } else {
        console.log("Incorrect Value : Check data input")
    }
}


//Delete a row
function deleteRow(dataArray,...args) {
    
   /* let key, keyValue;
    if (args.length == 1) {
        [key,keyValue] = ["ID", args[0]]
    } 
    else if (args.length ==2) {
          [key,keyValue] = args
    }*/
    let index = searchIndexByKey(dataArray, ...args);
    if (typeof index == "number") {
        dataArray.splice(index,1)
    }
    
}


function csvFormater(...args) {
    
    let dataArray, separator;
    if (args.length == 1) {
            [dataArray, separator] = [args[0], ","];
    }
    else if (args.length == 2) {
            [dataArray, separator] = [args[0],args[1]];
    }
    
    let headerRow = Object.keys(dataArray[0]);
    let rowsArray = dataArray.map(obj=> {
        let rowString = [];
        headerRow.forEach(key =>{
            rowString.push(obj[key])
        })
        return rowString.join(separator)
    })
    let completeData = rowsArray.slice();
    completeData
        .unshift(headerRow.join(separator));
        
    let completeDataCsv = completeData.join("\n");
    return completeDataCsv;
}


export {reader, searchIndexByKey, findRows, updateRow, addRow, deleteRow, csvFormater};