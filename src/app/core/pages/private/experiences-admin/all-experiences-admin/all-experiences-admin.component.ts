import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ExperiencesService } from "../../../../../services/api/experiences.service";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { Experiences } from "../../../../../models/experiences";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-experiences-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ShowDataComponent, MatDialogModule, TranslateModule, ButtonAdminComponent, LoadingComponent ],
  templateUrl: './all-experiences-admin.component.html'
})
export class AllExperiencesAdminComponent {

  // Inject the ExperiencesService to use its methods for email operations
  private _experiencesService = inject(ExperiencesService)
  private _dialog = inject(MatDialog) // Inject the MatDialog service to open dialogs
  private _translateService = inject(TranslateService); // Injected TranslateService instance for translations

  // Property to store error messages, initialized to null
  error: string | null = null
  // Property to track loading state, initialized to false
  loading: boolean = false

  // BehaviorSubject to store the list of experiences
  experiencesSubject$ = new BehaviorSubject<Experiences[]>([])

  // Observable to expose the list of experiences
  experiences$ = this.experiencesSubject$.asObservable()

  // Observable to hold the experiences details fetched by ID
  experienceById$!: Observable<Experiences>

  /**
   * Constructor to initialize the component.
   * Calls the getAllExperiences method to load all experiences.
   */
  constructor() {
    this.getAllExperiences()
  }

  /**
   * @method getAllExperiences
   * Fetches all experiences from the ExperiencesService and assigns them to experiences$.
   * Also handles loading state and error messages.
   */
  getAllExperiences() {
    this.loading = true; // Set loading state to true before making the API call

    this._experiencesService.getAllExperiences().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Experiences[])
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(experiences => {
      this.loading = false; // Set loading state to false after receiving the response
      this.experiencesSubject$.next(experiences)
    })
  }

  /**
   * @method getExperienceById
   * Fetches a single experiences by its ID from the ExperiencesService and assigns it to experienceById$.
   * @param id - ID of the experience to fetch
   */
  getExperienceById(id: string) {
    this.experienceById$ = this._experiencesService.getExperienceById(id)
  }

  /**
   * @method openDialog
   * Opens a dialog with experience details fetched by ID.
   * @param id - ID of the experience to fetch and display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      this.experienceById$ = this._experiencesService.getExperienceById(id)
      openDialogUtil(this._dialog, id, this.getExperienceById.bind(this), this.experienceById$, 'title', 'experience')
    }
  }

  /**
   * @method deleteExperience
   * Deletes an experience by its ID.
   * After deletion, refreshes the list of experiences by calling getAllExperiences().
   * @param id - ID of the experience to delete
   */
  deleteExperience(id?: string) {
    if (id) {
      this._experiencesService.deleteExperienceById(id).subscribe(() => {
        this.getAllExperiences()
      })
    }
  }

}
