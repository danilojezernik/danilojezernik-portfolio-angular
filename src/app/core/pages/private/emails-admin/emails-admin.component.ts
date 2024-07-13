import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from "../../../../services/api/contact.service";
import { GoBackComponent } from "../../../../shared/components/go-back/go-back.component";
import { ShowDataComponent } from "../../../../shared/components/show-data/show-data.component";
import { Observable } from "rxjs";
import { Contact } from "../../../../models/contact";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import {
  DialogGlobalAdminComponent
} from "../../../../shared/components/dialogs/dialog-global-admin/dialog-global-admin.component";
import { BUTTONS, DIALOG_DIMENSIONS } from "../../../../shared/global-const/global.const";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-emails-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ShowDataComponent, MatDialogModule, TranslateModule ],
  templateUrl: './emails-admin.component.html'
})
export class EmailsAdminComponent implements OnInit {

  private _contactService = inject(ContactService)
  private _dialog = inject(MatDialog)

  emails$!: Observable<Contact[]>
  emailById$!: Observable<Contact>

  ngOnInit() {
    this.getAllBlogs()
  }


  getAllBlogs() {
    this.emails$ = this._contactService.getAllEmailsAdmin()
  }

  getEmailById(id: string) {
    this.emailById$ = this._contactService.getEmailByIdAdmin(id)
  }

  deleteEmail(id: string) {
    if (id) {
      this._contactService.deleteEmailAdmin(id).subscribe(() => {
          this.getAllBlogs()
        },
        (error) => {
          console.error('Failed to delete email:', error); // Log error message if deletion fails
        })
    } else {
      console.error('Email by id doesn\'t exist'); // Log error if ID is undefined
    }
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

  protected readonly BUTTONS = BUTTONS;
}
