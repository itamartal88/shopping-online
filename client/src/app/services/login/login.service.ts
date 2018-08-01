import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
@Injectable()
export class LoginService {
  public searchInput:boolean = false;
  public localStorage:string;
  public token:string = '';
  public role:string;
  public admin:boolean;
  public costumer:boolean;
  public costumerdetails:any;
  public name = new BehaviorSubject<string>('');
  public notification = new BehaviorSubject<string>('');
  constructor() { }


  changeName(val:string){
    this.name.next(val);
  }

  changeNotification(val:string){
    this.notification.next(val);
  }


  getDate(date){
    var dateObj = new Date(date);
    var month = dateObj.getUTCMonth() + 1; 
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return year + "/" + month + "/" + day;
  }

  
}
