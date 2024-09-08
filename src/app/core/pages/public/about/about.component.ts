import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyGalleryComponent} from "../../../../shared/components/my-gallery/my-gallery.component";
import {MyExperiencesComponent} from "../../../../shared/components/my-experiences/my-experiences.component";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";
import {ABOUT_ME} from "../../../../shared/global-const/menu.const";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MyGalleryComponent, MyExperiencesComponent, HeroTitleComponent, TranslateModule, RouterLink],
  templateUrl: './about.component.html'
})
export class AboutComponent {

  protected readonly ABOUT_ME = ABOUT_ME;
}
