import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  show:boolean = false;
  public products = [];
  public admin:boolean;
  public costumer:boolean;
  constructor(public LoginService:LoginService) { }

  ngOnInit() {
   this.costumer = this.LoginService.costumer;
   this.admin = this.LoginService.admin;
  }
  getCtagory(event){  
  console.log(event.target.id);
  }

  closeNav(event) {
  document.getElementById('cart').style.width = '0%';
  document.getElementById('main').style.width = '100%';
  document.getElementById('showCart').style.display = 'block';
  }

  openNav(){
    document.getElementById('cart').style.width = '21%';
    document.getElementById('main').style.width = '79%';
    document.getElementById('showCart').style.display = 'none';
  }
}
