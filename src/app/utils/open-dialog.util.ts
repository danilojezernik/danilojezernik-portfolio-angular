import { MatDialog } from '@angular/material/dialog'
import { Observable } from 'rxjs'
import {
  DialogGlobalAdminComponent
} from "../shared/components/dialogs/dialog-global-admin/dialog-global-admin.component";
import { DIALOG_DIMENSIONS } from "../shared/global-const/global.const";

/**
 * Utility function to open a dialog with data fetched by ID.
 *
 * @param _dialog - MatDialog instance to open the dialog
 * @param id - ID to fetch the data
 * @param getDataById - Function to fetch data by ID
 * @param data$ - Observable that emits the data
 * @param titleKey - Key to extract the title from the data
 * @param error - String indicating what interface the ID belongs to
 */
export function openDialogUtil(
  _dialog: MatDialog,
  id: string | undefined,
  getDataById: (id: string) => void,
  data$: Observable<any>,
  titleKey: string,
  error: string
) {
  if (id) {
    // Fetch the data by ID
    getDataById(id)

    // Subscribe to the data observable
    data$.subscribe(data => {
      // Open the dialog with the fetched data
      _dialog.open(DialogGlobalAdminComponent, {
        data: {
          title: data[titleKey], // Set the dialog title using the specified title key
          allData: data // Pass all data to the dialog
        },
        ...DIALOG_DIMENSIONS.admin, // Apply predefined dialog dimensions
      })
    }, error => {
      console.error(`Error fetching data:`, error)
    })
  } else {
    // Log an error if no ID is provided
    console.error(`Error: No ID provided. Please provide a valid ${error} ID to display its details in the dialog.`)
  }
}
