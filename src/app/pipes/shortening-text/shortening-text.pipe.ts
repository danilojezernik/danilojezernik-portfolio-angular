import {Pipe, PipeTransform} from '@angular/core';
import {PAGINATION} from "../../shared/global-const/global.const";

@Pipe({
  name: 'shorteningText',
  standalone: true
})
export class ShorteningTextPipe implements PipeTransform {

  /**
   * Transforms a given text by shortening it to a specified limit and appending an ellipsis if needed.
   *
   * @param value - The original string that needs to be shortened.
   * @param limit - The maximum number of characters to keep (defaults to a value from PAGINATION constants).
   * @returns The shortened string with an ellipsis if it exceeds the limit, otherwise the original string.
   */
  transform(value: string, limit = PAGINATION.limitTextShortening): string {

    if (!value) return ''

    // If the value's length exceeds the limit, slice the string and append '...'
    // Otherwise, return the original string
    return value.length > limit ? value.slice(0, limit) + '...' : value
  }

}
