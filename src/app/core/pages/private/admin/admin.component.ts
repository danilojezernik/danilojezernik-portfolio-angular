import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { GoBackComponent } from "../../../../shared/components/go-back/go-back.component";
import { ADMIN_MENU } from "../../../../shared/global-const/menu.const";
import { TranslateModule } from "@ngx-translate/core";
import {BreadcrumbAdminComponent} from "../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, GoBackComponent, TranslateModule, BreadcrumbAdminComponent],
  templateUrl: './admin.component.html'
})
export class AdminComponent {

  protected readonly ADMIN_MENU = ADMIN_MENU;
}
