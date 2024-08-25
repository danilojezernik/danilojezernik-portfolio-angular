import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MEDIA_MENU} from "../../../../shared/global-const/global.const";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-media-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './media-admin.component.html'
})
export class MediaAdminComponent {

  protected readonly MEDIA_MENU = MEDIA_MENU;
}
