import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OrderService } from "../order.service"
import { Order } from "../order"
import { OrderItem } from "../order-item"
import { Router } from '@angular/router'

@Component({
  selector: 'app-receipt-editor',
  templateUrl: './receipt-editor.component.html',
  styleUrls: ['./receipt-editor.component.css']
})
export class ReceiptEditorComponent implements OnInit {
  receiptOrderInput:Order
  orderDate:string

  constructor(private orderService:OrderService, private currentRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.currentRoute.params.forEach( (params:Params) => {
      console.log(params['id']);
      this.receiptOrderInput = this.orderService.getOrder(params['id']);
      console.log(this.receiptOrderInput)
      this.orderDate = this.receiptOrderInput.create_time.toISOString().substring(0, 10);
    })
  }

  //add empty orderItem to the order's list of orderItems
  addOrderItem() {
    this.receiptOrderInput.items.push(new OrderItem("", 0, 0));
  }

  deleteOrderItem(index:number) {
    this.receiptOrderInput.items.splice(index, 1);
  }

  validate():boolean {
    if (typeof(this.orderDate) == "undefined" || this.orderDate.length == 0 ||
    this.receiptOrderInput.items.length == 0 || this.getUnnamedItems().length > 0)
      return false;
    else
      return true;
  }

  getUnnamedItems():Array<OrderItem> {
    return this.receiptOrderInput.items.filter( (orderItem, index, orderItems) => {
      return typeof(orderItem.item) == "undefined" || orderItem.item.length == 0;
    })
  }

  //save data to localStorage, boolean if success 
  save():boolean {
    if (this.validate()) {
      console.log("Saving data to localStorage");
      this.receiptOrderInput.create_time = new Date(this.orderDate);
      this.orderService.save();
      return true;
    } else {
      console.log("Unable to save data to localStorage, validation failed");
      return false;
    }
  }

  onSave() {
    if (this.save()) {
      this.router.navigate([""]);
    }
  }

}
