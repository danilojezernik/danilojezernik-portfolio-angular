import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyService } from "../../../../../services/api/technology.service";
import { MatDialog } from "@angular/material/dialog";
import { Technology } from "../../../../../models/technology";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-all-technology-technology',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ShowDataComponent, TranslateModule, ButtonAdminComponent, LoadingComponent ],
  templateUrl: './all-technology.component.html'
})
export class AllTechnologyComponent {

  // Inject the TechnologyService to use its methods
  private _technologyService = inject(TechnologyService)
  // Inject the MatDialog service to open dialogs
  private _dialog = inject(MatDialog)
  private _translateService = inject(TranslateService); // Injected TranslateService instance for translations

  // Property to store error messages, initialized to null
  error: string | null = null
  // Property to track loading state, initialized to false
  loading: boolean = false

  // BehaviorSubject to hold the list of all technologies
  private technologySubject = new BehaviorSubject<Technology[]>([]);
  // Observable to expose the technology list
  technology$ = this.technologySubject.asObservable();

  // Observable to hold the technology details fetched by ID
  technologyById$!: Observable<Technology>

  constructor() {
    this.loadTechnologies();
  }

  /**
   * Method to load all technologies and update the BehaviorSubject
   */
  loadTechnologies() {
    this.loading = true; // Set loading state to true before making the API call

    this._technologyService.getAllTechnologyAdmin().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Technology[])
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(technologies => {
      this.loading = false; // Set loading state to false after receiving the response
      this.technologySubject.next(technologies);
    });
  }

  /**
   * Method to fetch technology details by ID and assign to technologyById$
   * @param id - ID of the technology to fetch
   */
  getTechnologyById(id: string) {
    this.technologyById$ = this._technologyService.getTechnologyById(id)
  }

  /**
   * Method to open the dialog with technology details
   * @param id - ID of the technology to fetch and display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      // Fetch the technology details by ID
      this.technologyById$ = this._technologyService.getTechnologyById(id)
      // Use the utility function to open the dialog with the fetched data
      openDialogUtil(this._dialog, id, this.getTechnologyById.bind(this), this.technologyById$, 'title', 'technology')
    }
  }

  /**
   * Method to delete a technology by ID and update the BehaviorSubject
   * @param id - ID of the technology to delete
   */
  deleteTechnology(id?: string) {
    if (id) {
      this._technologyService.deleteTechnologyById(id).subscribe(() => {
        // After deleting, reload the technology list
        this.loadTechnologies();
      });
    }
  }
}
