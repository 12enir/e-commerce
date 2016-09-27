import { Injectable } from '@angular/core';
import { Order } from './order'
import { OrderItem } from './order-item'
@Injectable()
export class OrderService {

  constructor() { }
  getAllOrder():Array<Order> {
    let orders = [
      new Order([   
        new OrderItem("itemA", 1, 100),
        new OrderItem("itemB", 1, 200),
        new OrderItem("itemC", 2, 250)
        ], new Date("2015-12-12")),
      new Order([   
        new OrderItem("itemD", 1, 100),
        new OrderItem("itemE", 1, 200),
        new OrderItem("itemF", 2, 250)
        ])
    ];

  return orders;
  }

  getOrder(orderId:string):Order {
    let orders = this.getAllOrder();
    for (let i=0; i<orders.length; i++) {
      if (orders[i].id == orderId) {
        return orders[i];
      }
    }
  }

}

