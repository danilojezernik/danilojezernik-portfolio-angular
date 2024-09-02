import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MEDIA_MENU} from "../../../../shared/global-const/menu.const";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {GoBackComponent} from "../../../../shared/components/go-back/go-back.component";
import {BreadcrumbAdminComponent} from "../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";

@Component({
  selector: 'app-media-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, GoBackComponent, BreadcrumbAdminComponent],
  templateUrl: './media-admin.component.html'
})
export class MediaAdminComponent {

  protected readonly MEDIA_MENU = MEDIA_MENU;
}
