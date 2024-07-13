import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyService } from "../../../../../services/api/technology.service";
import { MatDialog } from "@angular/material/dialog";
import { Technology } from "../../../../../models/technology";
import { Observable } from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";
import { BUTTONS } from "../../../../../shared/global-const/global.const";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";

@Component({
  selector: 'app-all-technology-technology',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ShowDataComponent, TranslateModule, ButtonAdminComponent ],
  templateUrl: './all-technology.component.html'
})
export class AllTechnologyComponent {

  // Inject the TechnologyService to use its methods
  private _technologyService = inject(TechnologyService)
  // Inject the MatDialog service to open dialogs
  private _dialog = inject(MatDialog)

  // Observable to hold the list of all technologies
  technology$ = this._technologyService.getAllTechnology()
  // Observable to hold the technology details fetched by ID
  technologyById$!: Observable<Technology>

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

  protected readonly BUTTONS = BUTTONS;
}
