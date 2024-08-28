import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-hero-title',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero-title.component.html'
})
export class HeroTitleComponent {

  @Input() title!: string

  @Input() subtitle!: string

}
