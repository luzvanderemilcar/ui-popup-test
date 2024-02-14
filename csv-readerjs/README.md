## CSV Reader - Javascript
____
This module is intended to help manipulate csv file content

The code is divide into two major functionalities.

1. Manupilate csv data
2. Visualize csv data using table ins DOM elements.


### Manupilate CSV data

#### Read CSV data with csvReader()
**csvReader** function is available to process csv content. This function takes two parameters.

1. The first one is the **csv content** as a string inside backstick (``). This ensures the use of multiple lines string.

It is required for data processing.

2. The second is the **column separator**. It is optional. So, the default value is a comma (,).

The function returns an **array of objects**. Every object has properties inherited from the header and row data as respective key-value pair.

'''
let csvContent = `Id;Non;Siyati;Nesans;Vil;Stati;Referans
6;Xtr;YYIBD;1087;Place 4;atyi,Je xnnh`

let data = csvReader(csvContent, ";");
'''

#### Search data with complexSearch()

The function **complexSearch** is designed to bring accurate data from a given set of data according to some criterion.

This function takes up to three parameters with the two last ones optional.

1. *First parameter* : an array of objects representing the data row for each lines in csv file.
2. *Second parameter* : a string, a number, an array of strings or numbers or an object that contains the search patterns.

3. *Third parameter* : this parameter is optional. It is an object with some optional properties that is intended to filter the data search. 

*Specifications on the third parameter*

List of properties 

● **separator** : define the value of the separator inside csv text data. It is default to comma (,).

● **numberOfMatch** : a number that configures how many occurrences for a row to be considered as a match. This is particularly useful when searching for multiple values in a row.

● **matchExact** : it is a boolean that is intended the enforces exact match in search

 let defaultSearchCriterion = {
        separator : ",",
        numberOfMatch : 1,
        matchExact : false
    };


### Create table for data visualization

**createTable** is the function use to create a table element in the DOM then display that table on a DOM element.

It takes three parameters with the last one optional.

1. *First parameter* : a array of objects representing the data row for each lines of the csv file.
2. *Second parameter* : a DOM element on the page where to insert the table.
3. *Third parameter* : this parameter is optional. It is an object with some optional properties that is intended to filter the data to be inserted inside the table. 

#### Specifications on the third parameter

List of properties 

● **rowsToStrip** : it is an array of numbers. These numbers are the row number of each data row not to be inserted into the table. 

Note : the header row is excluded from row count. The number of row to be excluded should be less than the number of data rows inside the first parameter (data length)

● **columnsToStrip** : it is an array of headers or properties. These properties are the name of each column not to be inserted into the table.

● **mutateRow** : it is an optional boolean. This property control whether the *rowsToStrip* affects the first parameter or not. So, it helps control side effects or mutability of data.

When it is set to *true*, the row is deleted from the original data.

When it is set to *false* or it is not present at all, the row is not deleted from the original data.

● **mutateColumn** : this is an optional boolean. It works the same way as mutateRow for *columnsToStrip*. 


