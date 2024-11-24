import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";

@Component({
  selector: 'app-biography',
  standalone: true,
  imports: [CommonModule, HeroTitleComponent],
  templateUrl: './biography.component.html'
})
export class BiographyComponent {

}
