import { HttpService } from './../../services/http/http.service';
import { ProductsService } from './../../services/products/products.service';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  @Input() public pageAmount = [];
  public pageNum:number;
  public skipNum:number;
  @Input() public category:any;
  public products:any;
  constructor(public http:HttpService,public productService:ProductsService) { }

  ngOnInit() {
    this.productService.currentProduct.subscribe(product => this.products = product );
    this.productService.pageNumber.subscribe(val => this.pageNum = val);
  }

  getTop(){
    if(this.products.length <= 5){
      return '80%'
    }else{
      return '100%';
    }
  }

  getPage(page){
  this.pageNum = page;
  this.skipNum = (this.pageNum - 1) * 5;
  var obj = {
    category:this.category,
    skip:this.skipNum
  }
  this.http.getOneCategoryProducts(obj).subscribe((res) => {
    this.productService.changeProduct(res.products);
    this.productService.changeNumber(this.skipNum);
    this.productService.changePageNumber(this.pageNum);
  });
  }
  
}
