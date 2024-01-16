//Read csv file data with a specific separatorcsvReader l, separator optional
function csvReader(...args) {
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
    let dataObjectsArray = [];
    for (let i = 1; i < data.length; i++) {
        let row = data[i].split(separator);
        dataObjectsArray[i] = {};
        for (let j = 0; j < row.length; j++) {csvReader
            dataObjectsArray[i][header[j]] = row[j];
        }
    }
    return dataObjectsArray.slice(1,dataObjectsArray.length);
}

//Search a row with key-value pair, returns index
function findRowIndexByKeyValue(dataObjectsArray,...args) {
    
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
        while (!indexFound && i < dataObjectsArray.length) {
            let dataRow = dataObjectsArray[i];
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


// Search data passed as string, array or object. With number of counts and separator for string input optionals
function complexSearch(dataObjectsArray,...args) {
    let searchPattern, matchCountNumber, separator;
    let lookUpValues;
    
    //Flexible search entries Setting
    if (args.length == 1) {
        [searchPattern, matchCountNumber, separator] = [args[0], 1, ","]
    }
    else if (args.length == 2) {
            [searchPattern, matchCountNumber, separator] = [args[0], args[1], ","]
    }
    else if (args.length == 3) {
            [searchPattern, matchCountNumber, separator] = args
    }
   
   //Check the type of searchPattern
    if (typeof searchPattern == "string") {
        if (searchPattern.includes(separator)) {
        lookUpValues = string.split(separator)
        } else {
            // Handle single value string
            lookUpValues = [searchPattern]
        }
    }
    else if (typeof searchPattern == "number")  {
        // Handle single value number
        lookUpValues = [searchPattern.toString()]
    }
    else if (Array.isArray(searchPattern)) {
        lookUpValues = searchPattern
    }
    else if (searchPattern instanceof Object) {
        lookUpValues = Object.values(searchPattern)
    }

    let matchedRowIndexes = dataObjectsArray.reduce((accumulator, dataRow,idx) => {
        let rowValues = Object.values(dataRow);
        let matchCount = 0;
        
        //Process each row of search pattern 
        lookUpValues.forEach(itemToSearch => {
            if (rowValues.includes(itemToSearch)) {
                matchCount++;
            }
        })
        
        if (matchCount >= matchCountNumber) {
            accumulator.push(idx);
        }
        return accumulator
    }, []);
    
    return matchedRowIndexes
}


function getRowsFromIndexes(dataObjectsArray, indexInput) {
    let indexArray = [];
    if (typeof input == "number") {
        indexArray.push(indexInput)
    }
    else if (Array.isArray(indexInput)) {
        indexArray = [...indexInput]
    }
    return dataObjectsArray.filter((dataRow,idx) => {
        return indexArray.includes(idx)
    })
}


// Update the key-value pair of a row with specific idValue
function updateRow(dataObjectsArray, idValue, key, keyValue) {

    let idx = findRowIndexByKeyValue(dataObjectsArray,idValue);
    if (typeof idx == "number") {
        if (dataObjectsArray[idx].hasOwnProperty(key)) {
            dataObjectsArray[idx][key] = keyValue
        } else {
            console.log(`Property ${key} not found`)
        }
        return [dataObjectsArray[idx]]
    }
}


function addRow(dataObjectsArray,...args) {
    let headerRow = Object.keys(dataObjectsArray[0]);
    if (args.length == headerRow.length) {
        let dataRow = {};
        for (let i = 0; i < headerRow.length; i++) {
            dataRow[headerRow[i]] = args[i]
        }
        dataObjectsArray.push(dataRow)
    } else {
        console.log("Incorrect Value : Check data input")
    }
}


//Delete a row
function deleteRow(dataObjectsArray,...args) {
    
    let idx = findRowIndexByKeyValue(dataObjectsArray, ...args);
    if (typeof idx == "number") {
        dataObjectsArray.splice(idx,1)
    }
    
}


function csvFormater(dataObjectsArray,...args) {
    
    let separator;
    if (args.length == 0) {
            separator = ",";
    }
    else if (args.length == 1) {
            separator = args[0];
    }
    
    let headerRow = Object.keys(dataObjectsArray[0]);
    let rowsArray = dataObjectsArray.map(obj=> {
        let rowArray = Object.values(obj);
        return rowArray.join(separator)
    })
    
    //Adding headerRow at the top of data
    let completeData = rowsArray.slice();
    completeData
        .unshift(headerRow.join(separator));
        
    let completeDataCsv = completeData.join("\n");
    return completeDataCsv;
}


export {csvReader, findRowIndexByKeyValue, complexSearch, getRowsFromIndexes, updateRow, addRow, deleteRow, csvFormater};