import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slovenianDate',
  standalone: true
})
export class SlovenianDateTransformPipe implements PipeTransform {

  // Define Slovenian month names
  private slovenianMonths = [
    'januar', 'februar', 'marec', 'april', 'maj', 'junij',
    'julij', 'avgust', 'september', 'oktober', 'november', 'december'
  ];

  transform(value: any): any {
    if (!value) return null;

    // Parse the ISO date string to a Date object
    const parsedDate = new Date(value);

    // Extract day, month, and year
    const day = parsedDate.getDate();
    const month = parsedDate.getMonth(); // Returns 0-based index
    const year = parsedDate.getFullYear();

    // Return formatted date with Slovenian month name
    return `${day}. ${this.slovenianMonths[month]} ${year}`;
  }

}
