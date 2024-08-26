import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from "@angular/common";

@Pipe({
  name: 'slovenianDate',
  standalone: true
})
export class SlovenianDateTransformPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) return null;

    // Parse the ISO date string to a Date object
    const parsedDate = new Date(value);

    // Use 'sl-SI' locale for Slovenian
    return formatDate(parsedDate, 'dd. MM. yyyy', 'sl-SI');
  }

}
