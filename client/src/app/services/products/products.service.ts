import { HttpService } from './../http/http.service';
import { LoginService } from './../login/login.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductsService {
  public searchProduct = new BehaviorSubject<any>([]);
  currentProduct = this.searchProduct.asObservable();

  public editProduct = new BehaviorSubject<any>([]);
  currentEdit = this.editProduct.asObservable();

  public showEdit = new BehaviorSubject<boolean>(false);
  public hideAddProduct = new BehaviorSubject<boolean>(false);
  public num = new BehaviorSubject<number>(0);
  public pageNumber = new BehaviorSubject<number>(1);
  public productCategory = new BehaviorSubject<string>('');
  public allCategories = new BehaviorSubject<any>([]);

  constructor(public http:HttpService,public LoginService:LoginService) { }
 
  changeProduct(product){
    this.searchProduct.next(product);
  }

  getAllCategories(categories){
    this.allCategories.next(categories);
  }

  changeProductCategory(category:string){
    this.productCategory.next(category);
  }

  editProducts(product){ 
  this.editProduct.next(product);
  }
  changeNumber(val:number){
  this.num.next(val);
  }

  changeEdit(val:boolean){
    this.showEdit.next(val);
  }

  hideAdding(val:boolean){
    this.hideAddProduct.next(val);
  }

  changePageNumber(val:number){
    this.pageNumber.next(val);
  }
  

  addProductToCart(amo,product,total,cart){
    var amount = parseInt(amo);
    var productPrice = amount * product.unitPrice;
    total = total + productPrice;
    total =  Math.round(total * 100) / 100;
    var check = 0
    for(var i = 0; i < cart.length; i++){
      if(product._id == cart[i].id){
        cart[i].amount = cart[i].amount + amount;
        check++;
      }
    }
    if(check == 0){
      var p = {
        product:product.productName,
        productPrice:product.unitPrice,
        amount:amount,
        id:product._id
       }
       cart.push(p);
       console.log(cart);
    }
    return {
      products:cart,
      total:total
    }
  }

  checkAddingDate(product){
    var varDate = new Date(product.addingDate).getTime() + (7 * 24 * 60 * 60 * 1000); 
    var today = new Date().getTime();
   if(product.addingDate != null && varDate > today){
     return true;
   }
  }

 
}
