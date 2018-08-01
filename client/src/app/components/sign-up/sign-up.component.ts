import { SignUpService } from './../../services/sign-up/sign-up.service';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit,HostListener } from '@angular/core';
import { HttpService } from './../../services/http/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public email:string = '';
  public password:string = '';
  public confirmPassword:string = '';
  public id:number;
  public commont:any = '';
  constructor(public router:Router, public http:HttpService, public SignUpService:SignUpService) { }

  ngOnInit() {
    document.getElementById('step2').style.display = 'none';
  }
 

  @HostListener("window:keydown", ['$event'])
   onKeyDown(event:KeyboardEvent) {
    switch(event.key) {
      case 'ArrowRight':
      this.checkStep1();
      break;
      case 'Enter':
      this.checkStep1();
      break;
      case 'ArrowLeft':
      document.getElementById('step1').style.display = 'block';
      document.getElementById('step2').style.display = 'none';
          break;
      default:
     }
    }

    checkStep1(){
    if(this.email != '' && this.id != null && this.password != ''){
         if(this.checkValidition() == 'validition ok'){
         var obj = {
           id:this.id,
           password:this.password,
           email:this.email
         }
         this.SignUpService.personStep1 = obj;
         this.http.checkId(obj).subscribe((res)=>{
         if(res.length == 0){
         document.getElementById('step1').style.display = 'none';
         document.getElementById('step2').style.display = 'block';
         this.commont = '';
         }else{
           this.commont = 'this id excist in system';
                }
             });
           }else{
             this.commont = this.checkValidition();
           }
      }else{
        this.commont = 'you must fill all inputs';
      }
    }

    checkValidition(){
      var obj = { password:this.password,confirmPassword:this.confirmPassword,id:this.id,email:this.email };
      return this.SignUpService.checkValidition(obj);
    }

}

