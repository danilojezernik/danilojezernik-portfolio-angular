import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanvasBoxComponent} from "../../../../shared/components/canvas-box/canvas-box.component";
import {BrandsComponent} from "../../../../shared/components/brands/tech-brand/brands.component";
import {TranslateModule} from "@ngx-translate/core";
import {LatestBlogsComponent} from "../../../../shared/components/latest-blogs/latest-blogs.component";
import {MySkillsComponent} from "../../../../shared/components/my-skills/my-skills.component";
import {RouterLink} from "@angular/router";
import {UsedLanguagesComponent} from "../../../../shared/components/used-languages/used-languages.component";
import {ChatComponent} from "../../../../shared/components/chat/chat.component";
import {CtaHomeComponent} from "../../../../shared/components/cta-home/cta-home.component";
import {SvgHomeMainComponent} from "../../../../shared/components/svg/home-main/home-main.component";
import {
  TechnologiesUsedSvgComponent
} from "../../../../shared/components/svg/technologies-used-svg/technologies-used-svg.component";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";
import {
  DocumentationHomeComponent
} from "../../../../shared/components/documentation-home/documentation-home.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CanvasBoxComponent, BrandsComponent, TranslateModule, LatestBlogsComponent, MySkillsComponent, RouterLink, UsedLanguagesComponent, ChatComponent, CtaHomeComponent, SvgHomeMainComponent, TechnologiesUsedSvgComponent, HeroTitleComponent, DocumentationHomeComponent],
  templateUrl: './home.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {

}
