import { LoginService } from './../login/login.service';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
constructor(public tokenService:LoginService) { 
 
}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

 var authReq = req.clone({ headers: req.headers.set("authorization", this.tokenService.token)});
 
return next.handle(authReq)
 
.catch((error, caught) => {

console.log("Error Occurred");
console.log(error);

   return Observable.throw(error);
   }) as any;
 }
}

