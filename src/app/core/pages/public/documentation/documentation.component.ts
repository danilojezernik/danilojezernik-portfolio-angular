import {AfterViewInit, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as Prism from 'prismjs';
import {RouterLink} from "@angular/router";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroTitleComponent],
  templateUrl: './documentation.component.html'
})
export class DocumentationComponent implements AfterViewInit {

  selectedSection = 'Introduction'

  sections = [
    'Introduction',
    'Getting Started',
    'API Reference',
    'Examples'
  ]

  selectSection(section: string) {
    this.selectedSection = section;
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  }

  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
