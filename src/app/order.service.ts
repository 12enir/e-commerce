import { Injectable } from '@angular/core';
import { Order } from './order'
import { OrderItem } from './order-item'

const ORDERS = [new Order([   
        new OrderItem("itemA", 1, 100),
        new OrderItem("itemB", 1, 200),
        new OrderItem("itemC", 2, 250)
        ], new Date("2015-12-12")),
      new Order([   
        new OrderItem("itemD", 1, 100),
        new OrderItem("itemE", 1, 200),
        new OrderItem("itemF", 2, 250)
        ])];

const LOCAL_KEY:string = "order_key";

@Injectable()
export class OrderService {

  private _orders:Array<Order>;


  constructor() { 
    this.load();
  }


  getAllOrder():Array<Order> {
    return this._orders;
  }

  getOrder(orderId:string):Order {
    let orders = this.getAllOrder();
    for (let i=0; i<orders.length; i++) {
      if (orders[i].id == orderId) {
        return orders[i];
      }
    }
  }

  //save data order to localStorage
  save(orders:Array<Order>) {
    localStorage[LOCAL_KEY] = JSON.stringify(this._orders);
  }

  //load data order from localStorage -- kyk cookie, if there's no data yet
  load():Array<Order> {
    let jsonStringData = localStorage[LOCAL_KEY];
    let orderArray;
    if (typeof(jsonStringData) == "undefined") {
      //there is no data yet
      orderArray = ORDERS;
      this._orders = this.loadData(orderArray);
      this.save(this._orders)
    } else {
      orderArray = JSON.parse(jsonStringData);
      this._orders = this.loadData(orderArray);
    }
    return this._orders;
  }

  loadData(order_json_array:Array<any>) {
    let orders:Array<Order> = [];
    
    order_json_array.forEach( (order, index, orderArr) => {
      let orderItems:Array<OrderItem> = [];
      order.items.forEach( (orderItem, itemIndex, itemArr) => {
        orderItems.push(new OrderItem(orderItem.item, orderItem.quantity, orderItem.unit_price))
      })

      let savedOrder = new Order(orderItems, new Date(order.create_time));
      order.id = order.id
      orders.push(savedOrder);
    }) 

    return orders;
  }

}

