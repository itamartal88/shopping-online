import { CategoryHandlerService } from './../../services/categories/category-handler.service';
import { FavoriteService } from './../../services/favorite/favorite.service';
import { LoginService } from './../../services/login/login.service';
import { ProductsService } from './../../services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http/http.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
public categories = [];
public choosenCategory:any;
public categoryNum:number;
public pageNumbers = [];
public showCategory:boolean = true;
public showFavorite:boolean = false;
  constructor(public http:HttpService,public ProductsService:ProductsService,
  public categoryservice:CategoryHandlerService,public favoriteSer:FavoriteService) { }

  ngOnInit() {
    this.http.getAllCategories().subscribe((res)=>{
      this.categories = res.categories;
      this.ProductsService.getAllCategories(res.categories);
      this.getCtagory(this.categories[0]);
     });
  }

  getCtagory(categorty){
    this.favoriteSer.changeShowTopTen(true);
    this.favoriteSer.changeShowCostumeraddition(false);
    this.categoryNum = categorty.categoryId;
    var obj = {
      category:categorty,
      skip:0
    }
    document.getElementById('favIcon').style.color = 'white';
     this.showCategory = true;
     this.showFavorite = false;
     this.choosenCategory = categorty;
     this.http.getOneCategoryProducts(obj).subscribe((res)=>{
      var len = Math.ceil(res.length / 5);
      this.pageNumbers = [];
      this.ProductsService.changePageNumber(1);
      for(var i = 0; i < len; i++){
        this.pageNumbers.push(i + 1);
      }
       this.ProductsService.changeProduct(res.products);
       this.ProductsService.changeNumber(0);
     });
  }

  goToFavorite(){
    document.getElementById('favIcon').style.color = 'gold';
    this.showCategory = false;
    this.showFavorite = true;
    this.http.getFavorite().subscribe((res) => {
    this.categoryNum = 5;  
    this.pageNumbers = [1];
    this.categoryservice.changeHistory(true);
    this.favoriteSer.getCostumerTopTen(res);
    this.ProductsService.changeProduct(res);
    })
  }

}
