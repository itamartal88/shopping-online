import { FavoriteService } from './../../services/favorite/favorite.service';
import { CartService } from './../../services/cart/cart.service';
import { Http } from '@angular/http';
import { LoginGuard } from './../../guards/login.guard';
import { LoginService } from './../../services/login/login.service';
import { HttpService } from './../../services/http/http.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public userName:string = '';
public password:string = '';
public commont:string = '';
public notification:string;
public name:string;
public token:string;
public role:string;
constructor(public cartService:CartService,public router:Router,
  public http:HttpService,public LoginService:LoginService,
  public favoriteSer:FavoriteService,public LoginGuard:LoginGuard) { }

  ngOnInit() {
    if(this.LoginGuard.login == true){
      document.getElementById('shoppingBtn').className = 'btn btn-success';
    }
    this.commont = '';
    this.LoginService.name.subscribe(val => this.name = val);
    this.LoginService.notification.subscribe(val => this.notification = val);
  }

  signUp(){
    this.router.navigate(['sign']);
  }

login(){
  var obj = {
    name:this.userName,
    password:this.password
  }
  this.http.login(obj).subscribe((res)=>{
    if(res.person.length > 0){
      this.name = 'hello ' + res.name;
      if(res.cart[0] != undefined && res.cart[0].shippingDate == null){
       var newdate = this.LoginService.getDate(res.cart[0].orderDate);
      this.notification = 'you have open cart from ' + newdate; 
      this.cartService.changeTotalPrice(res.cart[0].totalPrice);
      this.cartService.changeCart(res.cart[0].productsInCart[0].product);
      } else if(res.cart[0] != undefined){
        for(var i = 0; i < res.cart.length; i++){
          var d = res.cart[i].orderDate;
        } 
        var newdate = this.LoginService.getDate(d);
        this.notification = 'your last cart was at ' + newdate;
        this.cartService.changeTotalPrice(0);
        this.cartService.changeCart([]);
      }else if(res.person["0"].role == 'admin'){
        this.notification = 'welcome Admin';
      }
      else{
        this.notification = 'welcome to your firs shopping here ;)';
        this.cartService.changeTotalPrice(0);
        this.cartService.changeCart([]);
      }
      this.favoriteSer.changeCostumerAddition(res.person[0].favoriteProducts);
      this.LoginService.localStorage = res.token;
      this.LoginService.role = res.person[0].role;
      this.LoginService.costumerdetails = res.person[0];
      document.getElementById('shoppingBtn').className = 'btn btn-success';
      this.LoginGuard.login = true;
      this.commont = '';
    }else{
      this.notification = '';
      this.name ='';
      this.commont = 'Name or Password wrong';
      this.LoginGuard.login = false;
      document.getElementById('shoppingBtn').className = 'btn btn-danger';
    }
   });
}

goToShop(){
    if(this.LoginService.role == 'costumer'){
      localStorage.setItem('costumer-key', this.LoginService.localStorage);
      this.LoginService.token =  localStorage.getItem('costumer-key');
      this.LoginService.searchInput = true;
      this.LoginService.costumer = true;
      this.router.navigate(['shop']); 

    }else if(this.LoginService.role == 'admin'){
     this.LoginService.admin = true; 
     localStorage.setItem('costumer-key', this.LoginService.localStorage);
     this.LoginService.token =  localStorage.getItem('costumer-key');
     this.LoginService.searchInput = true;
     this.router.navigate(['shop']); 
    }
    this.commont = 'Name or Password wrong';
 }

}
