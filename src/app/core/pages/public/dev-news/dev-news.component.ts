import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TECH_DEV_API_MENU} from "../../../../shared/global-const/menu.const";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";
import {LoadingComponent} from "../../../../shared/components/loading/loading.component";
import {ShorteningTextPipe} from "../../../../pipes/shortening-text/shortening-text.pipe";

@Component({
  selector: 'app-dev-vue',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroTitleComponent, LoadingComponent, TranslateModule, ShorteningTextPipe],
  templateUrl: './dev-news.component.html'
})
export class DevNewsComponent {

    protected readonly TECH_DEV_API_MENU = TECH_DEV_API_MENU;
}
