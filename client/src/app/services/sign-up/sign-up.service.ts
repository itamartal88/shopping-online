import { mailRegex } from './../allConsts/consts';
import { Injectable } from '@angular/core';

@Injectable()
export class SignUpService {
public personStep1={};
  constructor() { }


  checkValidition(obj){
  var checkEmail = mailRegex;
  if(obj.password == obj.confirmPassword){
    if(obj.id.toString().length == 9){
     if(checkEmail.test(obj.email)){
       return 'validition ok'
     }else{
       return 'check email address';
     }
    }else{
      return 'make sure id have 9 numbers';
     }
    }else{
    return 'password not confirm';
   }
  }

}
