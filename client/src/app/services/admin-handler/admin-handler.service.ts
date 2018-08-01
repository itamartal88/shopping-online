import { Injectable } from '@angular/core';

@Injectable()
export class AdminHandlerService {

  constructor() { }

  checkPrice(num:number){
    if(isNaN(num) == false && num >= 0 && num.toString().length > 0){
      return true
     }else{
       alert('price cant be negative');
     }
  }

  checkProductId(id:number){
    if(id > 4 || id <= 0 || isNaN(id)==true){
      alert('please make sure id ecxist');
    }else{
      return true;
    }
  }

  addProduct(product,file){
    if(product.name.length > 0 && product.categoryId != undefined && product.price != undefined && file != undefined){
      if((isNaN(product.price) == false && product.price > 0)){
       if(this.checkProductId(product.categoryId)){  
         return true;
      }
    }else{
      alert('price must be greater then 0');
    }
    }else{
      alert('you must fill all inputs and pick image');
    }
  }

}
