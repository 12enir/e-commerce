import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

 // @Input()
 // reciptOrderInput:Order
  reciptOrderInput:Order
  constructor(orderService:OrderService) { 
    this.reciptOrderInput = orderService.getAllOrder()[0];
  }

  ngOnInit() {
  }


}
