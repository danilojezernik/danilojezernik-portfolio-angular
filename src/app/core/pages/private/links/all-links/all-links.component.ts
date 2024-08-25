import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { LinksService } from "../../../../../services/api/links.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { RouterLink } from "@angular/router";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { Links } from "../../../../../models/links";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";

/**
 * @Component AllLinksComponent
 * Component for displaying and managing all links in the admin panel.
 * Uses the LinksService to fetch and delete links, and displays them using the ShowDataComponent.
 */

@Component({
  selector: 'app-all-links',
  standalone: true,
    imports: [CommonModule, ShowDataComponent, TranslateModule, RouterLink, ButtonAdminComponent, GoBackComponent, MatDialogModule, LoadingComponent, BreadcrumbAdminComponent],
  templateUrl: './all-links.component.html'
})
export class AllLinksComponent {

  // Inject the LinksService to use its methods
  private _linksService = inject(LinksService);
  private _dialog = inject(MatDialog); // Inject the MatDialog service to open dialogs
  private _translateService = inject(TranslateService); // Injected TranslateService instance for translations

  // Property to store error messages, initialized to null
  error: string | null = null;
  // Property to track loading state, initialized to false
  loading: boolean = false;

  // BehaviorSubject to store the list of links
  private linksSubject = new BehaviorSubject<Links[]>([]);
  // Observable to expose the list of links
  links$ = this.linksSubject.asObservable();

  // Observable to hold the link details fetched by ID
  linksById$!: Observable<Links>;

  /**
   * Constructor to initialize the component.
   * Calls the loadLinks method to load all links.
   */
  constructor() {
    this.loadLinks();
  }

  /**
   * @method loadLinks
   * Fetches all links from the LinksService and assigns them to links$.
   */
  loadLinks() {
    this.loading = true; // Set loading state to true before making the API call

    this._linksService.getAllLinksAdmin().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message;
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Links[]);
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(links => {
      this.loading = false; // Set loading state to false after receiving the response
      this.linksSubject.next(links);
    });
  }

  /**
   * @method getLinksById
   * Fetches a single link by its ID from the LinksService and assigns it to linksById$.
   * @param id - ID of the link to fetch
   */
  getLinksById(id: string) {
    this.linksById$ = this._linksService.getLinkById(id);
  }

  /**
   * @method deleteLink
   * Deletes a link by its ID.
   * After deletion, refreshes the list of links by calling loadLinks().
   * @param id - ID of the link to delete
   */
  deleteLink(id?: string) {
    if (id) {
      this._linksService.deleteLinkById(id).subscribe(() => {
        this.loadLinks(); // Refresh the list of links after deletion
      });
    }
  }

  /**
   * @method openDialog
   * Opens a dialog with link details fetched by ID.
   * @param id - ID of the link to fetch and display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      this.linksById$ = this._linksService.getLinkById(id); // Fetch link details by ID
      openDialogUtil(this._dialog, id, this.getLinksById.bind(this), this.linksById$, 'title', 'links'); // Open dialog with fetched data
    }
  }
}
