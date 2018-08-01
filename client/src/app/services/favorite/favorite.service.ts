import { ProductsService } from './../products/products.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class FavoriteService {
  public costumerAddition = new BehaviorSubject<any>([]);
  public showTopTen = new BehaviorSubject<boolean>(true);
  public showCostumerAdditons = new BehaviorSubject<boolean>(false);
  public costumerTopTen = new BehaviorSubject<any>([]);
  public filter = new BehaviorSubject<string>('Both');
  constructor(public ProductsService:ProductsService) { }

  changeCostumerAddition(val){
    this.costumerAddition.next(val);
  }

  addToFavorite(product,costumerAdditions){
    var checkInArray = costumerAdditions.map(function(e) { return e._id; }).indexOf(product._id);
    if(checkInArray > -1){
      costumerAdditions.splice(checkInArray,1);
      this.changeCostumerAddition(costumerAdditions);
    }else{
      costumerAdditions.push(product);
      this.changeCostumerAddition(costumerAdditions);
    }
  }

  changeShowTopTen(val:boolean){
    this.showTopTen.next(val);
  }

  changeShowCostumeraddition(val:boolean){
    this.showCostumerAdditons.next(val);
  }

  getCostumerTopTen(val){
    this.costumerTopTen.next(val);
  }

  changeFilter(val:string){
    this.filter.next(val);
  }

  getFilter(choosenFilter,addiotion,topten){
    if(choosenFilter == 'Yours Additions'){
      this.ProductsService.changeProduct(addiotion);
    }else if(choosenFilter == 'Top 10'){
      this.ProductsService.changeProduct(topten);
    }else if(choosenFilter == 'Both'){
      var arr = this.arrayUnique(addiotion.concat(topten));
      this.ProductsService.changeProduct(arr);
    }
  }

  arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i]._id === a[j]._id)
                a.splice(j--, 1);
        }
    }
    return a;
 }
}
