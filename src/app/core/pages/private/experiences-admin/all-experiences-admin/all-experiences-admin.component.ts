import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ExperiencesService } from "../../../../../services/api/experiences.service";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { BehaviorSubject, Observable } from "rxjs";
import { Experiences } from "../../../../../models/experiences";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";

@Component({
  selector: 'app-experiences-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ShowDataComponent, MatDialogModule, TranslateModule, ButtonAdminComponent ],
  templateUrl: './all-experiences-admin.component.html'
})
export class AllExperiencesAdminComponent {

  // Inject the ExperiencesService to use its methods for email operations
  private _experiencesService = inject(ExperiencesService)

  // Inject the MatDialog service to open dialogs
  private _dialog = inject(MatDialog)

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
   */
  getAllExperiences() {
    this._experiencesService.getAllExperiences().subscribe(experiences => {
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
