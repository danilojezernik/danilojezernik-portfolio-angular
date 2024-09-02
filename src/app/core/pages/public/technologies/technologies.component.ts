import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";
import {ShorteningTextPipe} from "../../../../pipes/shortening-text/shortening-text.pipe";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {TECHNOLOGIES_PUBLIC_MENU} from "../../../../shared/global-const/menu.const";

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule, HeroTitleComponent, ShorteningTextPipe, TranslateModule, RouterLink],
  templateUrl: './technologies.component.html'
})
export class TechnologiesComponent {

  protected readonly TECHNOLOGIES_PUBLIC_MENU = TECHNOLOGIES_PUBLIC_MENU;
}
