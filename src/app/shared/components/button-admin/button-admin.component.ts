import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BUTTONS} from "../../global-const/global.const";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

/**
 * Component decorator to define metadata for the ButtonAdminComponent
 * */

@Component({
  selector: 'app-button-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './button-admin.component.html'
})
export class ButtonAdminComponent {

  // Input property to receive the router link for the button
  @Input() routerLink?: string

  @Input() resetLocalStorage?: boolean

  // Input property to extend width of the button
  @Input() width?: boolean

  // Input property to receive an array of router link IDs for the button
  @Input() routerLinkId?: string[]

  // Output event emitter for the dialogRead event
  @Output() dialogRead = new EventEmitter<void>()

  // Output event emitter for the delete event
  @Output() delete = new EventEmitter<void>()

  // Output event emitter for the restore event
  @Output() remove = new EventEmitter<void>()



  // Method to emit the dialogRead event when the dialog is opened
  openDialog() {
    if (this.dialogRead) {
      this.dialogRead.emit()
    }
  }

  restoreLocalStorage() {
    if(this.remove) {
      this.remove.emit()
    }
  }

  // Method to emit the delete event when delete action is triggered
  deleteData() {
    const yes = confirm('Potrdite brisanje!')
    if (yes) {
      if (this.delete) {
        this.delete.emit()
      }
    }
  }

  // Reference to BUTTONS constant for button labels
  protected readonly BUTTONS = BUTTONS
}
