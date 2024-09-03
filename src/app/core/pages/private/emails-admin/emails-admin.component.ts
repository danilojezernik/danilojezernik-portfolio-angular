import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactService} from "../../../../services/api/contact.service";
import {GoBackComponent} from "../../../../shared/components/go-back/go-back.component";
import {ShowDataComponent} from "../../../../shared/components/show-data/show-data.component";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
import {Contact} from "../../../../models/contact";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonAdminComponent} from "../../../../shared/components/button-admin/button-admin.component";
import {openDialogUtil} from "../../../../utils/open-dialog.util";
import {LoadingComponent} from "../../../../shared/components/loading/loading.component";
import {BreadcrumbAdminComponent} from "../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";

/**
 * @Component EmailsAdminComponent
 * Component for managing emails in the admin panel.
 * Displays a list of emails, allows viewing details in a dialog, and supports deleting emails.
 */

@Component({
  selector: 'app-emails-admin',
  standalone: true,
  imports: [CommonModule, GoBackComponent, ShowDataComponent, MatDialogModule, TranslateModule, ButtonAdminComponent, LoadingComponent, BreadcrumbAdminComponent],
  templateUrl: './emails-admin.component.html'
})
export class EmailsAdminComponent {

  // Inject the ContactService to use its methods for email operations
  private _contactService = inject(ContactService);
  private _dialog = inject(MatDialog); // Inject the MatDialog service to open dialogs
  private _translateService = inject(TranslateService); // Injected TranslateService instance for translations

  // Property to store error messages, initialized to null
  error: string | null = null
  // Property to track loading state, initialized to false
  loading: boolean = false

  // BehaviorSubject to store the list of emails
  private emailSubject = new BehaviorSubject<Contact[]>([]);

  // Observable to expose the list of emails
  emails$ = this.emailSubject.asObservable();

  // Observable to hold the email details fetched by ID
  emailById$!: Observable<Contact>;

  /**
   * Constructor to initialize the component.
   * Calls the loadBlogs method to load all emails.
   */
  constructor() {
    this.loadEmails();
  }

  /**
   * @method loadEmails
   * Fetches all emails from the ContactService and assigns them to emails$.
   */
  loadEmails() {
    this.loading = true; // Set loading state to true before making the API call

    this._contactService.getAllEmailsAdmin().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Contact[])
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(email => {
      this.loading = false; // Set loading state to false after receiving the response
      this.emailSubject.next(email);
    });
  }

  /**
   * @method getEmailById
   * Fetches a single email by its ID from the ContactService and assigns it to emailById$.
   * @param id - ID of the email to fetch
   */
  getEmailById(id: string) {
    this.emailById$ = this._contactService.getEmailByIdAdmin(id);
  }

  /**
   * @method deleteEmail
   * Deletes an email by its ID.
   * After deletion, refreshes the list of emails by calling loadBlogs().
   * @param id - ID of the email to delete
   */
  deleteEmail(id?: string) {
    if (id) {
      this._contactService.deleteEmailAdmin(id).subscribe(() => {
        this.loadEmails(); // Refresh the list of emails after deletion
      });
    }
  }

  /**
   * @method openDialog
   * Opens a dialog with email details fetched by ID.
   * @param id - ID of the email to fetch and display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      this.emailById$ = this._contactService.getEmailByIdAdmin(id); // Fetch email details by ID
      openDialogUtil(this._dialog, id, this.getEmailById.bind(this), this.emailById$, 'name', 'email'); // Open dialog with fetched data
    }
  }

}
