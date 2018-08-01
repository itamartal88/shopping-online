import { Injectable } from '@angular/core';
var jsPDF = require('jspdf');
require('jspdf-autotable');
@Injectable()
export class OrderHandlerService {

  constructor() { }

  checkValidition(obj){
    var regex = new RegExp("^[0-9]{16}$");
    var today = new Date();
    var str = obj.credit.split(" ");
    var credit = ''
    for(var i = 0; i < str.length; i++){
     credit = credit + str[i];
    }
    today.setHours(0,0,0,0);
    if(obj.credit != '' && obj.street != '' && obj.city != ''){
      if(regex.test(credit)){
        if(obj.shippingDate != null && obj.shippingDate >= today){
          return 'validition ok';
        }else{
        return 'please check date are valid';
        }
        }else{
        return 'please make sure credit number contain 16 numbers';
        }
        }else{
        return 'you must fill all inputs';
      }
    }

  getColor(productName,search){
    if(search.indexOf(productName) > -1){
      return 'yellow';
    }else{
      return 'yellowgreen';
    }
   }

  countDateInArray(array, date,arrOfBusyDates) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === date) {
            count++;
        }
    }
    if(count >= 3){
      arrOfBusyDates.push(date);
    }
    return count;
  }

  crditNum(event){
    var val = event.target.value;
    var newval = '';
    val = val.replace(/\s/g, '');
    for(var i=0; i < val.length; i++) {
        if(i%4 == 0 && i > 0) newval = newval.concat(' ');
        newval = newval.concat(val[i]);
    }
    return newval;
 }

  printRecipt(cart,price){
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; 
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var today = day + "/" + month + "/" + year;
         var doc = new jsPDF();
         doc.setFontSize(12);
         doc.setFont('courier')
         doc.setFontType('bolditalic')
         doc.text(today,10,10);
         doc.setFontSize(20);
         doc.text('My crat',30,30); 
         doc.setFontSize(12);
         doc.addImage(imgData,'JPEG',160,10,30,30);
         var columns = ["Product Name", "Amount", "Price"];
         var rows = [];
         for(var i = 0; i < cart.length; i++){
             var insertToRows = [];
             insertToRows.push(cart[i].product);
             insertToRows.push(cart[i].amount);
             insertToRows.push(cart[i].productPrice);
             rows.push(insertToRows);
         } 
         doc.autoTable(columns, rows,{
             margin: {top: 45}
         }); 
         let finalY = doc.autoTable.previous.finalY; 
         doc.text(20, finalY + 5, "total price: " + price);
         doc.setTextColor(255, 0, 0);
         doc.setFont('times');
         doc.setFontType('italic');
         doc.text(20,finalY + 10,'thanks for buying at our store :)');
         doc.save('reciept.pdf');
        }

    }
  