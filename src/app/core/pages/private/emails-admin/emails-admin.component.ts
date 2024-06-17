import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from "../../../../services/api/contact.service";
import { GoBackComponent } from "../../../../shared/components/go-back/go-back.component";
import { ShowDataTestComponent } from "../../../../shared/components/show-data-test/show-data-test.component";
import { Observable } from "rxjs";
import { Contact } from "../../../../models/contact";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import {
  DialogGlobalAdminComponent
} from "../../../../shared/components/dialogs/dialog-global-admin/dialog-global-admin.component";
import { DIALOG_DIMENSIONS } from "../../../../shared/global-const/global.const";

@Component({
  selector: 'app-emails-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ShowDataTestComponent, MatDialogModule ],
  templateUrl: './emails-admin.component.html'
})
export class EmailsAdminComponent {

  private _contactService = inject(ContactService)
  private _dialog = inject(MatDialog)


  emails$ = this._contactService.getAllEmailsAdmin()
  emailById$!: Observable<Contact>

  getEmailById(id: string) {
    this.emailById$ = this._contactService.getEmailByIdAdmin(id)
  }

  openDialog(id?: string) {
    if (id) {
      this.getEmailById(id)
      this.emailById$.subscribe(data => {
        this._dialog.open(DialogGlobalAdminComponent, {
          data: {
            title: data.email,
            allData: data.message
          },
          ...DIALOG_DIMENSIONS.admin
        })
      })
    } else {
      console.error('No id')
    }
  }

}
