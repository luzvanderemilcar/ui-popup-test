## CSV Reader - Javascript
____
This module is intended to help manipulate csv file content

### Read CSV data

csvReader function is available to process csv content. This function takes two parameters.

The first one is the csv content as a string. It is required for data processing.

The second is the column separator. It is optional. So, the default value is a comma (,).

The function returns an array of objects. Every object has properties inherited from the header and row data as respective values.

'''
let csvContent = `ID;Non;Siyati;Nesans;Ville;Stati;Referans
6;Xtr;YYIBD;1087;Place 4;atyi,Je xnnh`

let data = csvReader(csvContent, ";");
'''