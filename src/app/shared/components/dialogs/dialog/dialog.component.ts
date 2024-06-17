import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

/**
 * This component is used as a reusable dialog that can display various types of data.
 * The data structure is expected to have a title and a list of data items.
 * @o
 */

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ CommonModule, MatDialogModule ],
  templateUrl: './dialog.component.html'
})
export class DialogComponent {


  /**
   * Constructor that injects data into the component.
   * @param data - An object containing the title and the data items to display.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, allData: any[] }) {
    // The data object is injected using MAT_DIALOG_DATA token, making it available for use in the component
    console.log(data)
  }

  /**
   * Helper method to get the keys of an object.
   * @param obj - The object from which to get the keys.
   * @returns An array of strings representing the keys of the object.
   */
  getObjectKeys(obj: any): any[] {
    return Object.keys(obj); // Return the keys of the object
  }

}
