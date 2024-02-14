function csvReader(...args) {
    let text, separator;

    // Default column separator to ","
    if (args.length == 1) {
        [text, separator] = [args[0], ","]
    }
    else if (args.length == 2) {
            [text, separator] = args
    }

    let data = text.split("\n")
    let header = data[0].split(separator);
    let dataArray = data.slice(1, data.length);

    return dataArray.map((row) => {
        let dataObject = {};

        //Iterate inside header row to set property value from row array
        header.forEach((property, idx) => {
            dataObject[property] = row.split(separator)[idx]
        })
        return dataObject
    })
}

//Search a row with key-value pair inside an array, returns an index
function findRowIndexByKeyValue(dataObjectsArray, ...args) {

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


// Search data passed as string, array or object. With number of counts and string input separator optionals
function complexSearch(dataObjectsArray, ...args) {
    
    let searchPattern, searchCriterion;
    let defaultSearchCriterion = {
        separator : ",",
        numberOfMatch : 1,
        strictFilterSearch : false
    };
    
    let lookUpValues;

    //Flexible search entries Setting
    if (args.length == 1) {
        [searchPattern] = args;
        searchCriterion = defaultSearchCriterion
    }
    else if (args.length == 2) {
            searchPattern = args[0];
           searchCriterion =  Object.assign(defaultSearchCriterion, args[1]);
    }
    
    //Check the type of searchPattern
    if (typeof searchPattern == "string") {
        if (searchPattern.includes(searchCriterion.separator)) {
            lookUpValues = string.split(separator)
        } else {
            // Handle single value string
            lookUpValues = [searchPattern]
        }
    }
    else if (typeof searchPattern == "number") {
        // Handle single value number
        lookUpValues = [searchPattern.toString()]
    }
    else if (Array.isArray(searchPattern)) {
        lookUpValues = searchPattern
    }
    else if (searchPattern instanceof Object) {
        lookUpValues = Object.values(searchPattern)
    }

    if (lookUpValues.length > 0) {
        let matchedRowsIndex = dataObjectsArray.reduce((accumulator, dataRow, idx) => {
            let rowValues = Object.values(dataRow);
            let matchCount = 0;

            //Process each row of search pattern 
            lookUpValues.forEach(itemToSearch => {
                rowValues.forEach(data => {
                    
                    
                    if (searchCriterion.strictFilterSearch) {
                        if (data == itemToSearch) {
                            matchCount++;
                        }
                    }
                    else {
                        let searchReg = new RegExp(itemToSearch, "gi");
                    if (searchReg.test(data)) {
                        matchCount++;
                    }
                    }
                })
            });
            // check occurrences of search result
            if (matchCount >= searchCriterion.numberOfMatch) {
                accumulator.push(idx);
            }
            return accumulator
        }, []);

        return matchedRowsIndex
    }
}

/*
Take an array of objects and one index or more ; return a filtered array of the
*/

function getRowsFromIndexes(dataObjectsArray, ...indexInput) {

    return dataObjectsArray.filter((dataRow, idx) => {
        return indexInput.includes(idx)
    })
}


// Update the key-value pair of a row with specific idValue
function updateRow(dataObjectsArray, idValue, key, keyValue) {

    let idx = findRowIndexByKeyValue(dataObjectsArray, idValue);

    if (typeof idx == "number") {
        if (dataObjectsArray[idx].hasOwnProperty(key)) {
            dataObjectsArray[idx][key] = keyValue
        } else {
            console.log(`Property ${key} not found`)
        }
        return [dataObjectsArray[idx]]
    }
}


function addRow(dataObjectsArray, ...args) {
    let headerRow = Object.keys(dataObjectsArray[0]);
    let dataInput;
    if (args.length == headerRow.length) {
        dataInput = args
    }
    else if (args.length == 1 && Array.isArray(args[0])) {
        dataInput = args[0]
    }

    if (dataInput.length == headerRow.length) {
        let dataRow = {};
        headerRow.forEach((property, idx) => {
            dataRow[property] = dataInput[idx]
        })
        dataObjectsArray.push(dataRow)
    }
    else {
        console.log("Incorrect Row Input: Check data input")
    }
}


//Delete a row
function deleteRow(dataObjectsArray, ...args) {

    let idx = findRowIndexByKeyValue(dataObjectsArray, ...args);
    if (typeof idx == "number") {
        dataObjectsArray.splice(idx, 1)
    }

}


function csvFormater(dataObjectsArray, ...args) {

    let separator;
    if (args.length == 0) {
        separator = ",";
    }
    else if (args.length == 1) {
        separator = args[0];
    }

    let headerRow = Object.keys(dataObjectsArray[0]);
    let rowsArray = dataObjectsArray.map(obj => {
        let rowArray = Object.values(obj);
        return rowArray.join(separator)
    })

    //Adding headerRow at the top of data
    rowsArray.unshift(headerRow.join(separator));

    let completeDataCsv = rowsArray.join("\n");
    return completeDataCsv;
}


export default { csvReader, findRowIndexByKeyValue, complexSearch, getRowsFromIndexes, updateRow, addRow, deleteRow, csvFormater };