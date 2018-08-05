# shopping-online

is an application of store where you can buy products online 

##To run the app you will need import the mongoDB db & collections

please follow up for next steps

##step 1

add all JSON files that excist in dbCollection folder up here inside
your mongoDB bin folder

##step 2

open commend-line as adminitrator and go to mongoDB bin directory

##step 3

execute the next lines (one at a time) 

mongoimport --db shopping-online --collection categories --file categories.json

mongoimport --db shopping-online --collection orders --file orders.json

mongoimport --db shopping-online --collection persons --file persons.json

mongoimport --db shopping-online --collection products --file products.json

##step 4

make sure shopping-online db was created with the relevant collections
