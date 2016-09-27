import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';

//get data from router
import { ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

 // @Input()
 // reciptOrderInput:Order
  reciptOrderInput:Order
  constructor(private orderService:OrderService, private currentRoute:ActivatedRoute) { 
    //this.reciptOrderInput = orderService.getAllOrder()[0];
  }

  ngOnInit() {
    //we want to access the id but we can't right away do .['id'] because it's Observable, value is not there yet
    this.currentRoute.params.forEach( (params:Params) => {
      console.log(params['id']);
      this.reciptOrderInput = this.orderService.getOrder(params['id'])
    })
  }



}
