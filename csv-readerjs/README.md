## CSV Reader - Javascript
____
This module is intended to help manipulate csv file content

### Read CSV data

csvReader function is available to process csv content. This function takes two parameters.

The first one is the csv content as a string. It is required for data processing.

The second is the column separator. It is optional. So, the default value is a comma (,).

The function returns an array of objects. Every object has properties inherited from the header and row data as respective values.

<code>
let csvContent = `ID;Non;Siyati;Batèm;Kongregasyon;Stati;Referans
3;Luzvander;EMILCAR;"2015";Deschaos;aktif;Jean Ricemane EMILCAR
5;Jean Ricemane;EMILCAR;2014;Deschaos;aktif;Luzvander EMILCAR
4;Marketon;JEAN-CHARLES;-;Deschaos;aktif;Markessia JEAN-CHARLES`

let data = csvReader(csvContent, ";");
</code>