import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { Observable } from "rxjs";

@Component({
  selector: 'app-receipt-selector',
  templateUrl: './receipt-selector.component.html',
  styleUrls: ['./receipt-selector.component.css']
})
export class ReceiptSelectorComponent implements OnInit {
  orders:Array<Order>
  promiseOrders:Promise<Array<Order>>
  observableOrder:Observable<Array<Order>>

  constructor(private orderService : OrderService) {
    this.orders = orderService.getAllOrder();
    /*this.orderService.getOrderFromURL( jsonOrders => {
      //create a nameless func that take jsonOrders as parameter. The value of this jsonOrders will be taken from the method that use this callback func
      this.orderService.loadData(jsonOrders);
    });*/

    //using promise
    //this.promiseOrders = this.orderService.getOrderFromURLUsingPromise();
    //this.observableOrder = this.orderService.getObservableOrderFromURL();
    
   }

   loadDataFromJson() {
    this.orderService.loadDataFromURL();
   }


  //init method after we are done creating the component instance
  ngOnInit() {
    /*this.promiseOrders.then( promisedOrder => {
      console.log(promisedOrder)
      this.orders = promisedOrder
    })*/

    /*this.observableOrder.subscribe( orderArray => {
      this.orders = orderArray;
    })*/

    this.orders = this.orderService.getAllOrder();
  }

  deleteOrder(id:number) {
    this.orderService.deleteOrder(id);
  }

  saveToDB() {
    this.orderService.save();
  }

}
