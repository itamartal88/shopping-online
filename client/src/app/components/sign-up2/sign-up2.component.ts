import { CartService } from './../../services/cart/cart.service';
import { LoginService } from './../../services/login/login.service';
import { LoginGuard } from './../../guards/login.guard';
import { HttpService } from './../../services/http/http.service';
import { SignUpService } from './../../services/sign-up/sign-up.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up2',
  templateUrl: './sign-up2.component.html',
  styleUrls: ['./sign-up2.component.css']
})
export class SignUp2Component implements OnInit {
  public Name:string = '';
  public lastName:string = '';
  public city:string = '';
  public street:string = '';
  public commont:string = '';
  constructor(public cartService:CartService,public LoginService:LoginService,public router:Router,public SignUpService:SignUpService,public http:HttpService,public LoginGuard:LoginGuard) { }

  ngOnInit() {
    this.commont = '';
  }

  step2(){
    var person = {
      name:this.Name,
      lastName:this.lastName,
      city:this.city,
      street:this.street,
      step1:this.SignUpService.personStep1,
    }
    if(this.Name !== '' && this.lastName !== '' && this.street !== ''){
      this.http.insertCostumer(person).subscribe((res)=>{
        this.LoginService.costumerdetails = res;
        this.cartService.changeTotalPrice(0);
        this.cartService.changeCart([]);
        this.LoginService.changeName('hello ' + this.Name);
        this.LoginService.changeNotification('welcome to your firs shopping here ;)')
        this.LoginService.role = res.role;
        this.LoginService.localStorage = res.token;
        this.LoginGuard.login = true;
        this.router.navigate(['login']);
        });
    }else{
     this.commont = 'please fill all inputs';
    }
  }
}
