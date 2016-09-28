import { Injectable } from '@angular/core';
import { Order } from './order';
import { OrderItem } from './order-item';
import { Http } from "@angular/http";
import  "rxjs/add/operator/toPromise"
import "rxjs/add/operator/map";
import {Observable} from "rxjs";

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
const URL:string = "data/orders.json"; //path to the file

@Injectable()
export class OrderService {

  private _orders:Array<Order>;


  constructor(private http:Http) { 
    this.load();
  }


  getAllOrder():Array<Order> {
    return this._orders;
  }

  getOrder(orderId:string):Order {
    let orders = this.getAllOrder();
    console.log('load')
    console.log(orders)
    for (let i=0; i<orders.length; i++) {
      if (orders[i].id == orderId) {
        return orders[i];
      }
    }
    return null
  }

  getOrderFromURL(callbackFunc:Function) {
    this.http.get(URL).subscribe( data => {
      console.log(data.json());

      callbackFunc(this.loadData(data.json())); //previously this is the way to do a callback function, pass the function as a parameter
    })
  }

  getObservableOrderFromURL():Observable<Array<Order>> {
    return this.http.get(URL).map( response => {
      return this.loadData(response.json());
    })
  }

  getOrderFromURLUsingPromise():Promise<Array<Order>> {
    return this.http.get(URL).toPromise()
        .then( response => {
          console.log("response: "+ response)
          return this.loadData(response.json());
        })
        .catch( reason => []); //if any error, just return empty array
  }

  //save data order to localStorage
  save() {
    localStorage[LOCAL_KEY] = JSON.stringify(this._orders);
  }

  deleteOrder(index:number) {
    this._orders.splice(index, 1);
  }

  loadDataFromURL():Promise<Array<Order>> {
    return this.http.get(URL).toPromise().then( response => {
      this._orders = this.loadData(response.json());
      this.save();
      return this._orders;
    })
  }

  //load data order from localStorage -- kyk cookie, if there's no data yet
  load():Array<Order> {
    let jsonStringData = localStorage[LOCAL_KEY];
    let orderArray;
    if (typeof(jsonStringData) == "undefined") {
      //there is no data yet
      console.log('get new')
      orderArray = ORDERS;
      this._orders = this.loadData(orderArray);
      this.save()
    } else {
      orderArray = JSON.parse(jsonStringData);
       console.log('load')
       console.log(orderArray)
      this._orders = this.loadData(orderArray);
       console.log(this._orders)
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
      savedOrder.id = order.id
      orders.push(savedOrder);
    }) 

    return orders;
  }

}

