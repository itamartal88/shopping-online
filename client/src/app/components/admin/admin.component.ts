import { AdminHandlerService } from './../../services/admin-handler/admin-handler.service';
import { CartService } from './../../services/cart/cart.service';
import { ProductsService } from './../../services/products/products.service';
import { HttpService } from './../../services/http/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
public showAdd:boolean;
public showEdit:boolean;
public editSend:boolean = true;
public showCommont:boolean = false;
public commont:string;
public editProduct:any;
public file:File;
public chackFile:File;
public editFile:File;
public productName:string = '';
public editProductName:string = '';
public categoryId:number;
public productPrice:number;
public productZero:number;
public editProductPrice:number = 0;
public productCategory:string;
public allCategories = [];
  constructor(public cartService:CartService,public http:HttpService,
   public adminHandler:AdminHandlerService,public ProductsService:ProductsService) { }

  ngOnInit() {
    this.ProductsService.currentEdit.subscribe(product => this.editProduct = product);
     this.ProductsService.showEdit.subscribe(val => this.showEdit = val);
     this.ProductsService.showEdit.subscribe(val => this.editSend = val);
     this.ProductsService.hideAddProduct.subscribe(val => this.showAdd = val);
     this.ProductsService.hideAddProduct.subscribe(val => this.showCommont = val);
     this.ProductsService.productCategory.subscribe(val => this.productCategory = val);
     this.ProductsService.allCategories.subscribe(val => this.allCategories = val);
  }

  showAddProduct(){
  this.showAdd = true;
  this.showEdit = false
  }

  changeValue(event){
    switch(event.target.id){
      case 'editName':
      this.editProductName = event.target.value;
      break;
      case 'editPrice':
      this.editProductPrice = event.target.value;
      break;
      case 'file':
      this.file = event.target.files;
      break;
      case 'editFile':
      this.editFile = event.target.files;
      break;
      default:
      console.log('not ecxsist');
      break;
    }
  }

  addProduct(){
    var obj = {
      name:this.productName,
      categoryId:this.categoryId,
      price:this.productPrice
    } 
    if(this.adminHandler.addProduct(obj,this.file)){    
    var formData = new FormData();
    formData.append('img', this.file[0]);
     formData.append('product', JSON.stringify(obj));
    this.http.addProduct(formData).subscribe((res) => {
      if(res.massege == ''){
        this.productName = '';
        this.categoryId = this.productZero;
        this.productPrice = this.productZero;
        this.file = this.chackFile;
        this.ProductsService.changeProduct(res.product);
      }else{
        alert(res.massege);
      }
    });
  }
}

  sendEditProduct(){
   if(this.adminHandler.checkPrice(this.editProductPrice)){
    if(this.editFile == undefined && this.editProductName == undefined && this.editProductPrice == undefined){
    console.log('not send');
    }else{
      var obj = {
        name:this.editProductName,
        price:this.editProductPrice,
        product:this.editProduct,
        productCategory:this.productCategory
       }
       var formData = new FormData(); 
       if(this.editFile != undefined){
        formData.append('img', this.editFile[0]);
       }
       formData.append('product', JSON.stringify(obj));
       this.http.editProduct(formData).subscribe((res) => {
        this.commont = res.massege;
        if(this.commont == 'Product Update Succsesfully'){
          this.editSend = false;
          this.showCommont = true;
          this.ProductsService.changeProduct(res.product);
        }else{
         alert(this.commont);
        }
      });
      this.editFile = this.chackFile;
      this.editProductName = '';
      this.editProductPrice = 0;
    }
   }
  }

}
