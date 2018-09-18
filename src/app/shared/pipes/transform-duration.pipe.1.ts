import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDuration'
})

export class TransformDurationPipe implements PipeTransform {

  transform(timeInMinutes: number): string {
    // tslint:disable-next-line:no-bitwise
    const hour = timeInMinutes / 60 ^ 0;
    if (hour) {
      const minutes = timeInMinutes % 60;
      if (minutes < 10) {
        return '0' + minutes;
      } else {
        return hour + ' ч ' + minutes + ' м';
      }
    } else {
      return timeInMinutes + ' м';
    }
  }

}
