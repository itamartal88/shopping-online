import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class CategoryHandlerService {
  public pageAmount = new BehaviorSubject<any>([]);
  public checkHistory = new BehaviorSubject<boolean>(false);
  constructor() { }

  changeHistory(val:boolean){
    this.checkHistory.next(val);
  }
}
