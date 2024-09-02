import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CopyrightDirective} from "../../directives/copyright.directive";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {MENU_TOP} from "../../shared/global-const/menu.const";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, CopyrightDirective, TranslateModule, RouterLink],
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  protected readonly MENU_TOP = MENU_TOP;
}
