import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterService } from "../../../../../services/api/newsletter.service";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";
import { Newsletter } from "../../../../../models/newsletter";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";

/**
 * @Component AllNewsletterAdminComponent
 * Component for managing newsletters in the administration panel.
 * Displays a list of newsletters and allows viewing and deleting individual newsletters.
 */

@Component({
  selector: 'app-all-newsletter-admin',
  standalone: true,
  imports: [ CommonModule, ButtonAdminComponent, GoBackComponent, ShowDataComponent ],
  templateUrl: './all-newsletter-admin.component.html'
})
export class AllNewsletterAdminComponent {
// Injected instances: NewsletterService for newsletter data and MatDialog for dialogs
  private _newsletterService = inject(NewsletterService) // Injected NewsletterService instance
  private _dialog = inject(MatDialog) // Injected MatDialog instance for dialogs

  // BehaviorSubject to store list of newsletters
  private _newsletterSubject = new BehaviorSubject<Newsletter[]>([])

  // Observables to expose the newsletters list
  newsletters$ = this._newsletterSubject.asObservable() // Observable to store list of newsletters
  newsletterById$!: Observable<Newsletter> // Observable to store a single newsletter item

  /**
   * Constructor to initialize the component.
   * Calls the getAllNewsletter method to load all newsletters.
   */
  constructor() {
    this.getAllNewsletter() // Fetch all newsletters on component initialization
  }

  /**
   * @method getAllNewsletter
   * Fetches all newsletters from the NewsletterService and assigns them to newsletters$.
   */
  getAllNewsletter() {
    this._newsletterService.getAllNewsletters().subscribe(newsletter => {
      this._newsletterSubject.next(newsletter) // Update the BehaviorSubject with fetched newsletters
    })
  }

  /**
   * @method getNewsletterById
   * Fetches a single newsletter by its ID from the NewsletterService and assigns it to newsletterById$.
   * @param id - ID of the newsletter to fetch
   */
  getNewsletterById(id: string) {
    this.newsletterById$ = this._newsletterService.getNewsletterById(id) // Fetch newsletter by ID and store in observable
  }

  /**
   * @method deleteNewsletter
   * Deletes a newsletter by its ID.
   * After deletion, refreshes the list of newsletters by calling getAllNewsletter().
   * @param id - ID of the newsletter to delete
   */
  deleteNewsletter(id?: string) {
    if (id) {
      this._newsletterService.deleteNewsletterById(id).subscribe(() => {
        this.getAllNewsletter() // Refresh the list of newsletters after deletion
      })
    }
  }

  /**
   * Method to open the dialog with newsletter details
   * @param id - ID of the newsletter to fetch and display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      this.newsletterById$ = this._newsletterService.getNewsletterById(id) // Fetch newsletter details by ID
      openDialogUtil(this._dialog, id, this.getNewsletterById.bind(this), this.newsletterById$, 'title', 'newsletter') // Open dialog with fetched data
    }
  }
}
