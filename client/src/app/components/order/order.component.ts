import { OrderHandlerService } from './../../services/order/order-handler.service';
import { HttpService } from './../../services/http/http.service';
import { DialogComponent } from './../dialog/dialog.component';
import { LoginService } from './../../services/login/login.service';
import { CartService } from './../../services/cart/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/Rx' ;
declare var $:any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public minDate = new Date();
  public maxDate = new Date(2018, 11, 31);
  public cart = [];
  public orderValidition:boolean
  public commont:string;
  public shippingDate:Date;
  public total:number;
  public search = [];
  public street:string = '';
  public city:string  = '';
  public creditCard:string = '';
  public myFilter:any;
  public allDates = [];
  constructor(public http:HttpService,public dialog: MatDialog,
    public loginservice:LoginService,public cartService:CartService,
    public orderhandler:OrderHandlerService,public router:Router) { 
 
  }

  ngOnInit() {
    this.cartService.currentCart.subscribe(cart => this.cart = cart);
    this.cartService.toalPrice.subscribe(val => this.total = val);
    this.cartService.searchInRecive.subscribe(val => this.search = val);
    this.http.getBusyDays().subscribe((res) => {
     this.allDates = res;
    })
    var arrOfBusyDates = [];
    this.myFilter = (d: Date): boolean => {
      const day = d.getDay();
      var shortDate = this.loginservice.getDate(d);
      this.orderhandler.countDateInArray(this.allDates, shortDate,arrOfBusyDates);
      return day !== 6 && arrOfBusyDates.indexOf(shortDate) == -1 ;
    }
   }

   crditNum(event){
    event.target.value = this.orderhandler.crditNum(event);
   }
 
  getColor(productName){
  return this.orderhandler.getColor(productName,this.search);
  }

  backToShop(){
   this.router.navigate(['shop']);
  }

  order(){
    this.cartService.cartReciept = document.getElementById('text');
    if(this.checkValidition() == 'validition ok'){
      var obj = {
        credit:this.creditCard,
        city:this.city,
        street:this.street,
        date:this.shippingDate
      }
    this.http.order(obj).subscribe((res) => {
      if(res.message < 3){
        this.orderValidition = false; 
        this.cartService.changeChil(true);
        this.cartService.changBusy(false);
        this.dialog.open(DialogComponent, {
          height: '300px',
          width: '500px'
        })
      }else if(res.message >= 3){
        this.cartService.changeChil(false);
        this.cartService.changBusy(true);
        this.dialog.open(DialogComponent, {
          height: '300px',
          width: '500px'
        })
      }
    })
    }else{
    this.commont = this.checkValidition();
    this.orderValidition = true; 
    console.log('credit not valid')
  }
  }

    checkValidition(){
     var obj = {credit:this.creditCard,street:this.street,city:this.city,shippingDate:this.shippingDate} 
     return this.orderhandler.checkValidition(obj);
    }

  setStreet(){
  this.street = this.loginservice.costumerdetails.street;
  }

  setCity(){
    this.city = this.loginservice.costumerdetails.city;
  }
}
