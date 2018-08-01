import { CategoryHandlerService } from './../../services/categories/category-handler.service';
import { CartService } from './../../services/cart/cart.service';
import { HttpService } from './../../services/http/http.service';
import { ProductsService } from './../../services/products/products.service';
import { LoginGuard } from './../../guards/login.guard';
import { LoginService } from './../../services/login/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
 public searchInput:boolean;
 public cart = []
 public search:string = '';
 public searchResult = [];
 public showEdit:boolean;
 public showAdd:boolean;
 public searchInRecieptResult = [];
  constructor(public cartService:CartService,public http:HttpService,
     public ProductsService:ProductsService,public LoginService:LoginService,
     public router:Router,public LoginGuard:LoginGuard,
     public categoryService:CategoryHandlerService ) { }

  ngOnInit() {
    this.searchInput = this.LoginService.searchInput;
    this.ProductsService.currentProduct.subscribe(product => this.searchResult = product );
    this.cartService.currentCart.subscribe(cart => this.cart = cart);
  }
  logOut(){
    localStorage.removeItem('costumer-key');
    this.LoginService.token = '';
    this.LoginGuard.login = false;
    this.ProductsService.changeProduct([]);
    this.LoginService.searchInput = false;
    this.LoginService.admin = false;
    this.LoginService.changeName('');
    this.LoginService.changeNotification('');
    this.LoginService.costumer = false;
   this.ProductsService.changeEdit(false);
    this.ProductsService.hideAdding(false);
    this.router.navigate(['login']);
  }

  searchProduct(event){
    var obj = {
      name:this.search
    }
    this.categoryService.changeHistory(false);
  if(this.router.url == '/order' && this.search.length > 0){
    this.searchInRecieptResult = [];
   for(var i = 0; i < this.cart.length; i++){
     var pro = this.cart[i].product.toLowerCase();
     if(pro.indexOf(this.search) > -1){
       this.searchInRecieptResult.push(this.cart[i].product);
     }
   }
   this.cartService.changeSearch(this.searchInRecieptResult);
  }
  else if(this.search.length > 2){
  this.http.searchProduct(obj).subscribe((res) => {
    this.ProductsService.changeProduct(res);
    });
   }else{
    this.cartService.changeSearch('');
   }
  }


}
