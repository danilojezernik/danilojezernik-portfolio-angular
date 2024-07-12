import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { GoBackComponent } from "../../../../shared/components/go-back/go-back.component";
import { ADMIN_MENU } from "../../../../shared/global-const/global.const";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ CommonModule, RouterLink, GoBackComponent, TranslateModule ],
  templateUrl: './admin.component.html'
})
export class AdminComponent {

  protected readonly ADMIN_MENU = ADMIN_MENU;
}
