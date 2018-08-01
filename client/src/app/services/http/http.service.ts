
import { url } from './../allConsts/consts';
import { Injectable,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/observable';
@Injectable()
export class HttpService {
  constructor(public http:HttpClient) { }
  
  getAllCategories():Observable<any>{
    return this.http.get(url + 'shop/category/getAll').map(res => res);
  }

  getOneCategoryProducts(category):Observable<any>{
    return this.http.post(url + 'shop/products/getCatgory',category).map(res => res);
  }

  searchProduct(name):Observable<any>{
    return this.http.post(url + 'shop/products/search',name).map(res => res);
  }

  checkId(id):Observable<any>{
    return this.http.post(url + 'persons/checkId',id).map(res => res);
  }

  insertCostumer(person):Observable<any>{
    console.log(person);
    return this.http.post(url + 'persons/insert',person);
  }
  
  login(person):Observable<any>{                           
    console.log(person);
    return this.http.post(url + 'persons/login', person).map(res => res);
  }

  editProduct(formData):Observable<any>{
    return this.http.post(url + 'shop/admin/editProduct',formData).map(res => res); 
  }

  addProduct(formData):Observable<any>{
  return this.http.post(url + 'shop/admin/addProduct',formData).map(res => res); 
  }

  addProductToCart(product):Observable<any>{
    return this.http.post(url + 'shop/order/insertProduct',product).map(res => res); 
    }

  order(person):Observable<any>{
    console.log(person);
      return this.http.post(url + 'shop/order/order',person).map(res => res); 
   }

   getNumOfProducts():Observable<any>{
     return this.http.get(url + 'notification/getAllProducts');
   }

   getNumOfOrders():Observable<any>{
    return this.http.get(url + 'notification/getAllOrders');
  }

  deleteCart():Observable<any>{
    return this.http.get(url + 'shop/order/deleteCart');
  }

  getBusyDays():Observable<any>{
    return this.http.get(url + 'shop/order/getBusyDays');
  }

  getFavorite():Observable<any>{
    return this.http.get(url + 'shop/order/favorite');
  }

  addToFavorite(product){
    return this.http.post(url + 'shop/products/addFavo', product);
  }
  
}
