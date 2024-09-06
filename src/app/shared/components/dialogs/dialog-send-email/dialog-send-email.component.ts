import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {formEmailToRegisteredUserConfig} from "../../../global-const/form-config";
import {Email} from "../../../../models/email";
import {EmailService} from "../../../../services/api/email.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-dialog-send-email',
  templateUrl: './dialog-send-email.component.html'
})
export class DialogSendEmailComponent {

  private _emailService = inject(EmailService)
  private _dialogRef = inject(DialogRef<DialogSendEmailComponent>)

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user_id: string, user: string }) {
  }

  sendEmail(formValidator: Email) {

    this._emailService.sendEMail(this.data.user_id, formValidator).subscribe(() => {

    })
    this._dialogRef.close()
  }

  protected readonly formEmailToRegisteredUserConfig = formEmailToRegisteredUserConfig;
}
