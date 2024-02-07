## CSV Reader - Javascript
____
This module is intended to help manipulate csv file content

The code is divide into two major functionalities.

1. Read and process csv data
2. Create table and visualize table items on DOM elements.


### Read CSV data

**csvReader** function is available to process csv content. This function takes two parameters.

1. The first one is the **csv content** as a string inside backstick (``). This ensures the use of multiple lines string.

It is required for data processing.

2. The second is the **column separator**. It is optional. So, the default value is a comma (,).

The function returns an **array of objects**. Every object has properties inherited from the header and row data as respective key-value pair.

'''
let csvContent = `Id;Non;Siyati;Nesans;Ville;Stati;Referans
6;Xtr;YYIBD;1087;Place 4;atyi,Je xnnh`

let data = csvReader(csvContent, ";");
'''

### Create table for data visualization

**createTable** function is the function use to createTable a table element in the DOM the display this table on a DOM element.

It takes three parameters with the last one optional.

1. *First parameter* : a list of object representing the data row for each lines in csv file.
2. *Second parameter* : a DOM element on the page where to insert the table.
3. *Third parameter* : this parameter is optional. It is an object with some optional properties. It is intended to filter the data to be inserted inside the table. 

#### Specifications on the third parameter

List of properties 

**rowsToStrip** : it is an array of numbers. These numbers are the row number of each data row not to be inserted into the table. 

Note : the header row is excluded from row count. The number of row to be excluded should be less than the number of data row inside the first parameter (data length)

**columnsToStrip** : it is an array of headers or properties. These properties are the name of each column not to be inserted into the table.

**mutateRow** : it is an optional boolean. This property control whether the *rowsToStrip* affects the first parameter or not. So, it helps control side effects or mutability of data.

When it is set to *true*, the row are deleted from the original data.

When it is set to *false* or it is not present at all, the row stripped down are not deleted from the original data.

**mutateColumn** : this is an optional boolean. It works the same way as mutateRow for columnsToStrip. 


