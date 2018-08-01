import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shop'
})
export class ShopPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
