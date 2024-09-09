import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsedLanguagesService} from "../../../../services/api/used-languages.service";
import {BreadcrumbAdminComponent} from "../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {SlovenianDateTransformPipe} from "../../../../pipes/date-transform/slovenian-date-transform.pipe";

@Component({
  selector: 'app-language-data',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, SlovenianDateTransformPipe],
  templateUrl: './language-data.component.html'
})
export class LanguageDataComponent {

  private _languageDataService = inject(UsedLanguagesService)

  language$ = this._languageDataService.getLanguagesAdmin()

}
