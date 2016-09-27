import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taxPipe'
})
export class TaxPipePipe implements PipeTransform {

  transform(num:number, tax?: number): any {
    const DEFAULT_TAX:number = 7;
    let itemTax:number = DEFAULT_TAX;
    if (typeof(tax) == "number") {
      itemTax = tax
    }
    
    return num * itemTax / 100;
  }

}
