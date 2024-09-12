import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsedLanguagesComponent} from "../../../../shared/components/used-languages/used-languages.component";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";

@Component({
  selector: 'app-stack-data',
  standalone: true,
  imports: [CommonModule, UsedLanguagesComponent, HeroTitleComponent],
  templateUrl: './stack-data.component.html'
})
export class StackDataComponent {

}
