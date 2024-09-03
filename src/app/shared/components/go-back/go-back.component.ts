import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACKBAR_MESSAGES} from "../../global-const/global.const";

@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './go-back.component.html'
})
export class GoBackComponent {

  // Injecting Location service to handle navigation back
  private _back = inject(Location)
  private _snack = inject(MatSnackBar)
  private _translateService = inject(TranslateService)
  // Input properties to conditionally display buttons based on the admin section being viewed

  // Show button if in books admin
  @Input() booksAdmin?: boolean

  // Show button if in blogs admin
  @Input() blogsAdmin?: boolean

  // Show button if in projects admin
  @Input() projectsAdmin?: boolean

  // Show button if in projects admin
  @Input() angularAdmin?: boolean
  @Input() vueAdmin?: boolean
  @Input() pythonAdmin?: boolean
  @Input() javascriptAdmin?: boolean
  @Input() typescriptAdmin?: boolean
  @Input() mongodbAdmin?: boolean

  @Input() inLocalStorage?: string

  // Show button if in books media admin section
  @Input() booksMediaAdmin?: boolean

  // Show button if in blogs media admin section
  @Input() blogsMediaAdmin?: boolean

  // Show button if in projects media admin section
  @Input() projectsMediaAdmin?: boolean

  // Show button if in projects media admin section
  @Input() angularMediaAdmin?: boolean
  @Input() vueMediaAdmin?: boolean
  @Input() pythonMediaAdmin?: boolean
  @Input() javascriptMediaAdmin?: boolean
  @Input() typescriptMediaAdmin?: boolean
  @Input() mongodbMediaAdmin?: boolean

  // Show button if viewing a public blog by ID
  @Input() blogByIdPublic?: boolean


  // Output event emitter for the restore event
  @Input() removeBoolean?: boolean
  @Output() remove = new EventEmitter<void>()

  restoreLocalStorage() {
    if(this.remove) {
      this.remove.emit()
      this._translateService.get([SNACKBAR_MESSAGES.reordered, SNACKBAR_MESSAGES.close]).subscribe((translation) => {
        this._snack.open(translation[SNACKBAR_MESSAGES.reordered], translation[SNACKBAR_MESSAGES.close], {
          duration: 3000
        })
      })
    }
  }

  // Method to navigate back to the previous page
  goBack() {
    this._back.back()
  }

  get isInLocalStorage(): boolean {
    return !!localStorage.getItem(this.inLocalStorage || '');
  }
}
