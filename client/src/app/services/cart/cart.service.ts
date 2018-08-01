import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
@Injectable()
export class CartService {
  public cartReciept:HTMLElement;
  public cartProducts = new BehaviorSubject<any>([]);
  public toalPrice = new BehaviorSubject<number>(0);
  public searchInRecive = new BehaviorSubject<any>([]);
  public chillDate = new BehaviorSubject<boolean>(false);
  public busyDate = new BehaviorSubject<boolean>(false);
  currentCart = this.cartProducts.asObservable();
  constructor() { }

  changeSearch(val:any){
    this.searchInRecive.next(val);
  }

  changeCart(cart){
    this.cartProducts.next(cart);
  }

  changeTotalPrice(val:number){
    this.toalPrice.next(val);
  }

  changBusy(val:boolean){
    this.busyDate.next(val);
  }

  changeChil(val:boolean){
    this.chillDate.next(val);
  }

  deleteItemFromCart(product,cart,total){
    var index = cart.indexOf(product,0);
    if(index > -1){
      cart.splice(index,1);
      var num = product.amount * product.productPrice;
      total = total - num;
      total =  Math.round(total * 100) / 100;
      return {
        products:cart,
        total:total
      }
    }
  }

}