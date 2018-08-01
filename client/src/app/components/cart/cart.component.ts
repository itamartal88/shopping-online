import { HttpService } from './../../services/http/http.service';
import { CartService } from './../../services/cart/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart = [];
  public total:number;
  constructor(public http:HttpService,public router:Router,public cartService:CartService) { }

  ngOnInit() {
    this.cartService.currentCart.subscribe(cart => this.cart = cart);
    this.cartService.toalPrice.subscribe(val => this.total = val);
  }

  goToOrder(){
    if(this.cart.length > 0){
      this.router.navigate(['order']);
    }else{
      alert('you must buy for go this page');
    }
  }

  deleteItemFromCart(product){
      var newCart = this.cartService.deleteItemFromCart(product,this.cart,this.total);
      this.cart = newCart.products;
      this.total = newCart.total;
      this.cartService.changeTotalPrice(this.total);
      this.cartService.changeCart(this.cart);
      this.http.addProductToCart(newCart).subscribe((res) => {
      })
    }

  deleteCart(){
    this.total = 0;
    this.cart = [];
    this.http.deleteCart().subscribe((res) => {
      this.cartService.changeTotalPrice(this.total);
      this.cartService.changeCart(this.cart);
    })
  }

}
