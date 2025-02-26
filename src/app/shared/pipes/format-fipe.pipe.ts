import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFipe',
  standalone: true
})
export class FormatFipePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (!value.length) {
      return null;
    }
    const regex = /(\d{6})-?(\d{1})/;
    return value.replace(regex, '$1-$2');
  }

}
