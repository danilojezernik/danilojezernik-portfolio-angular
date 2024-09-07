import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanvasBoxComponent} from "../../../../shared/components/canvas-box/canvas-box.component";
import {BrandsComponent} from "../../../../shared/components/brands/tech-brand/brands.component";
import {TranslateModule} from "@ngx-translate/core";
import {LatestBlogsComponent} from "../../../../shared/components/latest-blogs/latest-blogs.component";
import {MySkillsComponent} from "../../../../shared/components/my-skills/my-skills.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CanvasBoxComponent, BrandsComponent, TranslateModule, LatestBlogsComponent, MySkillsComponent, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
