import { HttpService } from './../../services/http/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public numOfProduct:string;
  public numOfOrders:string;
  constructor(public http:HttpService) { }

  ngOnInit() {
    this.http.getNumOfProducts().subscribe((res) => {
      this.numOfProduct = res;
    });
    this.http.getNumOfOrders().subscribe((res) => {
      this.numOfOrders = res;
    })
  }

}
