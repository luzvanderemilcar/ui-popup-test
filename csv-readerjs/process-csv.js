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
function searchIndexByKey(...args) {

    let dataArray, key,keyValue ;
    // default search key to "ID"
    if (args.length == 2) {
        [dataArray, key ,keyValue] = [args[0], "ID", args[1]];
    }
    else if (args.length ==3) {
        [dataArray, key, keyValue] = args;
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
function updateValue(dataArray, idValue, key, keyValue) {

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

export {reader, searchIndexByKey, findRows, updateValue};