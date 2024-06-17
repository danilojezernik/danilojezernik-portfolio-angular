import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from "../../../../shared/components/go-back/go-back.component";
import { ExperiencesService } from "../../../../services/api/experiences.service";
import { ShowDataTestComponent } from "../../../../shared/components/show-data-test/show-data-test.component";
import { Observable } from "rxjs";
import { Experiences } from "../../../../models/experiences";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import {
  DialogGlobalAdminComponent
} from "../../../../shared/components/dialogs/dialog-global-admin/dialog-global-admin.component";
import { DIALOG_DIMENSIONS } from "../../../../shared/global-const/global.const";

@Component({
  selector: 'app-experiences-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ShowDataTestComponent, MatDialogModule ],
  templateUrl: './experiences-admin.component.html'
})
export class ExperiencesAdminComponent {

  private _experiencesService = inject(ExperiencesService)
  private _dialog = inject(MatDialog)

  experiences$ = this._experiencesService.getAllExperiencesAdmin()
  experienceById$!: Observable<Experiences>

  getExperienceById(id: string) {
    this.experienceById$ = this._experiencesService.getExperienceById(id)
  }

  openDialog(id?: string) {
    if (id) {
      this.getExperienceById(id)
      this.experienceById$.subscribe(data => {
        this._dialog.open(DialogGlobalAdminComponent, {
          data: {
            title: data.title,
            allData: data
          },
          ...DIALOG_DIMENSIONS.admin
        })
      })
    } else {
      console.error('No id')
    }
  }

}
