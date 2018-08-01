import { OrderHandlerService } from './../../services/order/order-handler.service';
import { element } from 'protractor';
import { CartService } from './../../services/cart/cart.service';
import { LoginGuard } from './../../guards/login.guard';
var jsPDF = require('jspdf');
require('jspdf-autotable');
import { ProductsService } from './../../services/products/products.service';
import { LoginService } from './../../services/login/login.service';
import { Router } from '@angular/router';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public cart = [];
  public total:number;
  public text:any;
  public busyDate:boolean;
  public chillDate:boolean;
  constructor(
    public LoginGuard:LoginGuard ,public ProductsService:ProductsService ,
    public LoginService:LoginService,public router: Router,
    public orderHandler:OrderHandlerService,
    public dialogRef: MatDialogRef<DialogComponent>,
    public cartService:CartService,
    @Inject(MAT_DIALOG_DATA) public data: any) { dialogRef.disableClose = true; }


  ngOnInit() {
    this.cartService.currentCart.subscribe(cart => this.cart = cart);
    this.cartService.toalPrice.subscribe(val => this.total = val);
    this.cartService.chillDate.subscribe(val => this.chillDate = val);
    this.cartService.busyDate.subscribe(val => this.busyDate = val);
  }

  orderFinish(){
    localStorage.removeItem('costumer-key');
    this.LoginService.token = '';
    this.LoginGuard.login = false;
    this.ProductsService.changeProduct([]);
    this.LoginService.searchInput = false;
    this.LoginService.admin = false;
    this.LoginService.costumer = false;
    this.LoginService.changeName('');
    this.LoginService.changeNotification('');
   this.ProductsService.changeEdit(false);
    this.ProductsService.hideAdding(false);
    this.router.navigate(['login']);
    this.dialogRef.close();
  }

  downloadReciept(){
   this.orderHandler.printRecipt(this.cart,this.total);
  }

  busyDay(){
    this.dialogRef.close();
  }
}

