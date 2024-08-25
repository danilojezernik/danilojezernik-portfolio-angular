import {inject, Injectable} from '@angular/core';
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ClipboardCopyService {

  // Inject services to copy image name to clipboard
  private _clipboard = inject(Clipboard)
  private _snack = inject(MatSnackBar)

  copyImageName(img: string) {
    this._clipboard.copy(img)
    this._snack.open(`Shranjeno v odložišče: ${img}`, 'Close', {
      duration: 5000 // Duration in milliseconds (5000ms = 5 seconds)
    })
  }
}
