import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order';

@Component({
  selector: 'app-receipt-selector',
  templateUrl: './receipt-selector.component.html',
  styleUrls: ['./receipt-selector.component.css']
})
export class ReceiptSelectorComponent implements OnInit {
  orders:Array<Order>

  constructor(orderService : OrderService) {
    this.orders = orderService.getAllOrder();
   }


  //init method after we are done creating the component instance
  ngOnInit() {
  }

}
