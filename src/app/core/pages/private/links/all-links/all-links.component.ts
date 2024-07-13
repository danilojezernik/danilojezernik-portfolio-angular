import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { LinksService } from "../../../../../services/api/links.service";
import { BUTTONS } from "../../../../../shared/global-const/global.const";
import { TranslateModule } from "@ngx-translate/core";
import { RouterLink } from "@angular/router";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";

@Component({
  selector: 'app-all-links',
  standalone: true,
  imports: [ CommonModule, ShowDataComponent, TranslateModule, RouterLink, ButtonAdminComponent ],
  templateUrl: './all-links.component.html'
})
export class AllLinksComponent {

  private _linksService = inject(LinksService)

  links$ = this._linksService.getAllLinksAdmin()

  protected readonly BUTTONS = BUTTONS;
}
