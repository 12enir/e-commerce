import { Pipe, PipeTransform } from '@angular/core';
import { OrderItem } from './order-item'

@Pipe({
  name: 'totalPipe'
})
export class TotalPipePipe implements PipeTransform {

  transform(items: Array<OrderItem>, args?: any): any {
    if (items == null || items.length == 0 ) {
      return 0;
    }

    let itemSum = 0;
    items.forEach(item =>{
      itemSum += item.unit_price * item.quantity;
    })

    return itemSum;
  }

}
