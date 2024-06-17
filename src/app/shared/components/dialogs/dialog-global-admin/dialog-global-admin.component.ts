import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

/**
 * @Component declaration for DialogGlobalAdminComponent.
 *
 * This component serves as a reusable dialog component designed to display various types of data.
 * It expects input data with a title and either an array of objects or a string.
 */

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ CommonModule, MatDialogModule ],
  templateUrl: './dialog-global-admin.component.html'
})
export class DialogGlobalAdminComponent {


  /**
   * Constructor that injects data into the component.
   * @param data - An object containing the title and the data items to display.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, allData: any[] }) {
    // The data object is injected using MAT_DIALOG_DATA token, making it available for use in the component
  }

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

}
