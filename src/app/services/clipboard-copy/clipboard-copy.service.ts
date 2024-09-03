import {inject, Injectable} from '@angular/core';
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {SNACKBAR_MESSAGES} from "../../shared/global-const/global.const";

@Injectable({
  providedIn: 'root'
})
export class ClipboardCopyService {

  // Inject services to copy image name to clipboard
  private _clipboard = inject(Clipboard)
  private _snack = inject(MatSnackBar)
  private _translateService = inject(TranslateService)

  copyImageName(img: string) {
    this._clipboard.copy(img)
    this._translateService.get([SNACKBAR_MESSAGES.imageSaved, SNACKBAR_MESSAGES.close]).subscribe((translation) => {
      this._snack.open(`${translation[SNACKBAR_MESSAGES.imageSaved]}: ${img}`, translation[SNACKBAR_MESSAGES.close], {
        duration: 3000
      })
    })
  }
}
