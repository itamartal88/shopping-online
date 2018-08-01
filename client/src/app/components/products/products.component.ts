import { CategoryHandlerService } from './../../services/categories/category-handler.service';
import { FavoriteService } from './../../services/favorite/favorite.service';
import { CartService } from './../../services/cart/cart.service';
import { LoginService } from './../../services/login/login.service';
import { HttpService } from './../../services/http/http.service';
import { LoginComponent } from './../login/login.component';
import { ProductsService } from './../../services/products/products.service';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public cart = [];
  public total:number;
  public showTopTen:boolean = true;
  public showCostumerAdditions:boolean = true;
  public checkHistory:boolean;
  public products = [];
  public editProd:any;
  public showEdit:boolean;
  public filters: string[] = ['Top 10', 'Yours Additions', 'Both'];
  public choosenFilter: string = this.filters[2];
  @Input() public showFavorite:boolean;
  @Input() public showCategory:boolean;
  @Input() public category:any;
  public admin:boolean;
  public costumer:boolean;
  public amount:number = 1;
  public num:number;
  @Input() public pageAmount = [];
  public pageNum:number;
  public allCategories = [];
  public costumerTopTen:any;
  constructor(public snackBar: MatSnackBar,public cartService:CartService,
    public LoginService:LoginService,public http:HttpService,
    public favoriteSer:FavoriteService,public categoryService:CategoryHandlerService,
    public ProductsService:ProductsService) { }

  ngOnInit() {
    this.ProductsService.currentProduct.subscribe(product => this.products = product );
    this.ProductsService.currentEdit.subscribe(product => this.editProd = product);
    this.cartService.currentCart.subscribe(cart => this.cart = cart);
    this.ProductsService.showEdit.subscribe(val => this.showEdit = val);
    this.ProductsService.num.subscribe(val => this.num = val);
    this.ProductsService.pageNumber.subscribe(val => this.pageNum = val);
    this.cartService.toalPrice.subscribe(val => this.total = val);
    this.ProductsService.allCategories.subscribe(val => this.allCategories = val);
    this.admin = this.LoginService.admin;
    this.costumer = this.LoginService.costumer;
    this.favoriteSer.costumerTopTen.subscribe(val => this.costumerTopTen = val);
    this.categoryService.checkHistory.subscribe(val => this.checkHistory = val);
  }

  openSnackBar(message: string, action:any) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
  
  editProduct(product){
  if(this.getCategoryName(product.categoryId)){  
  this.ProductsService.editProducts(product);
  this.ProductsService.changeEdit(true);
  this.ProductsService.hideAdding(false);
  }
  }
 
  getCategoryName(categoryId){
    for(var i = 0; i < this.allCategories.length; i++){
      if(this.allCategories[i]._id == categoryId){
        this.ProductsService.changeProductCategory(this.allCategories[i].Name);
        return true;
      }
    }
  }
 
  addProductToCart(event,product,message,action){
  var amount = event.path[1].lastChild.previousSibling.value;
  if(isNaN(parseFloat(amount)) || amount == 0){
   alert('you can only insert numbers');
   event.path[1].lastChild.previousSibling.value = 1;
  }else{
  var newCart = this.ProductsService.addProductToCart(amount,product,this.total,this.cart);
  this.total = newCart.total;
  this.cart = newCart.products;
  this.cartService.changeTotalPrice(this.total);
  this.cartService.changeCart(this.cart);
  event.path[1].lastChild.previousSibling.value = 1;
  this.http.addProductToCart(newCart).subscribe((res) => {
    this.openSnackBar(message,action);
  })
 }
}

  getMoreProducts(event){
  if(this.showCategory == true){
   if(event.target.id == 'arrToRight'){
    this.num = this.num + 5;
    var obj = {
      category:this.category,
      skip:this.num
    }
     this.http.getOneCategoryProducts(obj).subscribe((res)=>{
       if(res.products.length > 0){
        this.ProductsService.changePageNumber(this.pageNum + 1);
        this.products = res.products;
       }else{
       this.num = this.num - 5;
       }
     });
    }else if(this.num <= 0){
   
    }else{
     this.num = this.num -5;
     var obj = {
      category:this.category,
      skip:this.num
    }
    this.http.getOneCategoryProducts(obj).subscribe((res)=>{
      this.ProductsService.changePageNumber(this.pageNum -1);
      this.products = res.products;
    });
    }
   }else{
     ///send choosen filter and change product
   }
  }

  checkDate(product){
    return this.ProductsService.checkAddingDate(product);
  }

}
