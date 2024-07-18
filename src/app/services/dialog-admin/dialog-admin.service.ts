import { inject, Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import {
  DialogGlobalAdminComponent
} from "../../shared/components/dialogs/dialog-global-admin/dialog-global-admin.component";
import { DIALOG_DIMENSIONS } from "../../shared/global-const/global.const";
import { DeviceDetectorService } from "ngx-device-detector";

@Injectable({
  providedIn: 'root'
})
export class DialogAdminService {

  private _deviceService = inject(DeviceDetectorService);
  private _dialog = inject(MatDialog);

  openDialogUtil(
    id: string | undefined,
    getDataById: (id: string) => void,
    data$: Observable<any>,
    titleKey: string,
    error: string,
  ) {
    if (id) {
      // Fetch the data by ID
      getDataById(id)

      // Subscribe to the data observable
      data$.subscribe(data => {
        const isMobile = this._deviceService.isMobile();
        // Open the dialog with the fetched data
        this._dialog.open(DialogGlobalAdminComponent, {
          data: {
            title: data[titleKey], // Set the dialog title using the specified title key
            allData: data // Pass all data to the dialog
          },
          ...(isMobile ? DIALOG_DIMENSIONS.adminMobile : DIALOG_DIMENSIONS.admin), // Apply predefined dialog dimensions
          panelClass: 'p-0'
        })
      })
    } else {
      // Log an error if no ID is provided
      console.error(`Error: No ID provided. Please provide a valid ${error} ID to display its details in the dialog.`)
    }
  }
}
