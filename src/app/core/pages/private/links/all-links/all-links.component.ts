import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { LinksService } from "../../../../../services/api/links.service";
import { TranslateModule } from "@ngx-translate/core";
import { RouterLink } from "@angular/router";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { Links } from "../../../../../models/links";
import { BehaviorSubject } from "rxjs";

/**
 * @Component AllLinksComponent
 * Component for displaying and managing all links in the admin panel.
 * Uses the LinksService to fetch and delete links, and displays them using the ShowDataComponent.
 */

@Component({
  selector: 'app-all-links',
  standalone: true,
  imports: [ CommonModule, ShowDataComponent, TranslateModule, RouterLink, ButtonAdminComponent, GoBackComponent ],
  templateUrl: './all-links.component.html'
})
export class AllLinksComponent {

  // Inject the LinksService to use its methods
  private _linksService = inject(LinksService);

  // BehaviorSubject to store the list of links
  private linksSubject = new BehaviorSubject<Links[]>([]);
  // Observable to expose the list of links
  links$ = this.linksSubject.asObservable();

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
    this._linksService.getAllLinksAdmin().subscribe(links => {
      this.linksSubject.next(links);
    });
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
}
