import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calFilter'
})
export class CalFilterPipe implements PipeTransform {

  transform(items: any[], field: number, value: number): any {
    if(!items) return [];
    if(!value) return items;
    return items.filter(it => it[field] <= value)
  }

}
