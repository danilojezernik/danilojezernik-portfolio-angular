import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {formEmailToRegisteredUserConfig} from "../../../global-const/form-config";
import {Contact} from "../../../../models/contact";

@Component({
  selector: 'app-dialog-send-email',
  templateUrl: './dialog-send-email.component.html'
})
export class DialogSendEmailComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string, user: string }) {
    console.log(data)
  }

  sendEmail(formValidator: Contact) {
    console.log(formValidator)
  }

  protected readonly formEmailToRegisteredUserConfig = formEmailToRegisteredUserConfig;
}
