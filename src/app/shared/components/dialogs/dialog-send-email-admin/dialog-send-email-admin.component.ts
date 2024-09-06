import {Component, inject, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReusableFormAddComponent} from "../../../forms/reusable-form-add/reusable-form-add.component";
import {TranslateModule} from "@ngx-translate/core";
import {formEmailToRegisteredUserConfig} from "../../../global-const/form-config";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Email} from "../../../../models/email";
import {EmailService} from "../../../../services/api/email.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-dialog-send-email-admin',
  standalone: true,
  imports: [CommonModule, ReusableFormAddComponent, TranslateModule],
  templateUrl: './dialog-send-email-admin.component.html'
})
export class DialogSendEmailAdminComponent {

  private _emailService = inject(EmailService)
  private _dialogRef = inject(DialogRef<DialogSendEmailAdminComponent>)

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user_email: string}) {
  }

  storeEmailShortened(email: string): string {
    const atIndex = email.indexOf('@');

    if (atIndex === -1) {
      console.error("Invalid email format");
      return '';
    }

    // Extract the part before the '@'
    const localPart = email.slice(0, atIndex);

    // Get the first letter
    const firstLetter = localPart.charAt(0);

    // Get the middle letter (handle even and odd lengths)
    const middleIndex = Math.floor(localPart.length / 2);
    const middleLetter = localPart.charAt(middleIndex);

    // Get the last three characters
    const lastThree = localPart.slice(-3);

    // Concatenate the result: first + middle + last three
    return firstLetter + middleLetter + lastThree;
  }

  sendEmail(user_email: string, formValidator: Email) {
    this._emailService.sendEmailAdmin(user_email, formValidator).subscribe(() => {
      const shortenedEmail = this.storeEmailShortened(user_email);

      // Store the email in localStorage
      let sentEmails = JSON.parse(localStorage.getItem('_se') || '[]'); // Get the existing sent emails array
      if (!sentEmails.includes(shortenedEmail)) {
        sentEmails.push(shortenedEmail); // Add the new shortened email if it's not already there
      }
      localStorage.setItem('_se', JSON.stringify(sentEmails)); // Save the updated array to local storage
    });
    this._dialogRef.close();
  }

  protected readonly formEmailToRegisteredUserConfig = formEmailToRegisteredUserConfig;
}
