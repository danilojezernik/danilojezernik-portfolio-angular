import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbAdminComponent} from "../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {GoBackComponent} from "../../../../shared/components/go-back/go-back.component";
import {TranslateModule} from "@ngx-translate/core";
import {TECHNOLOGIES_ADMIN_MENU} from "../../../../shared/global-const/menu.const";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, GoBackComponent, TranslateModule, RouterLink],
  templateUrl: './technologies-admin.component.html'
})
export class TechnologiesAdminComponent {

  protected readonly TECHNOLOGIES_MENU = TECHNOLOGIES_ADMIN_MENU;
}
