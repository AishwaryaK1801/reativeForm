import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordShowHide'
})
export class PasswordShowHidePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
