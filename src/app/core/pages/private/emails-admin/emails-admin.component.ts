import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from "../../../../services/api/contact.service";
import { GoBackComponent } from "../../../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-emails-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent ],
  templateUrl: './emails-admin.component.html'
})
export class EmailsAdminComponent {

  private _contactService = inject(ContactService)

  emails$ = this._contactService.getAllEmailsAdmin()

}
