import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";

/**
 * @Component declaration for DialogGlobalAdminComponent.
 *
 * This component serves as a reusable dialog component designed to display various types of data.
 * It expects input data with a title and either an array of objects or a string.
 */

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ CommonModule, MatDialogModule, TranslateModule, MatButtonModule ],
  templateUrl: './dialog-global-admin.component.html'
})
export class DialogGlobalAdminComponent {


  /**
   * Constructor that injects data into the component.
   * @param data - An object containing the title and the data items to display.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, allData: any[] }) {}

  /**
   * Method to determine if a given value is an object.
   * @param val - The value to check.
   * @returns true if 'val' is an object (excluding null); otherwise, returns false.
   */
  isObject(val: any): boolean {
    return typeof val === 'object' && val !== null; // Checks if 'val' is an object (excluding null)
  }

  /**
   * Helper method to retrieve the keys of an object.
   * @param obj - The object for which to retrieve keys.
   * @returns An array of strings representing the keys of 'obj'.
   */
  getObjectKeys(obj: any): any[] {
    return Object.keys(obj); // Returns an array of strings representing the keys of 'obj'
  }

  /**
   * Method to check if the value is a non-empty string.
   * @param value - The value to check.
   * @returns true if 'value' is a non-empty string; otherwise, returns false.
   */
  isStringAndNotEmpty(value: any): boolean {
    return typeof value === 'string' && value.trim() !== '';
  }

  /**
   * Method to check if the value is a boolean.
   * @param value - The value to check.
   * @returns true if 'value' is a boolean; otherwise, returns false.
   */
  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

}
