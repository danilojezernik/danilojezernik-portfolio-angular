import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-svg.component.html'
})
export class LanguageSvgComponent {
  // Mapping language codes to their SVG icons
  public static languageIcons: { [key: string]: string } = {
    en: `<svg xmlns="http://www.w3.org/2000/svg" ...>English SVG...</svg>`,
    sl: `<svg xmlns="http://www.w3.org/2000/svg" ...>Slovene SVG...</svg>`,
    de: `<svg xmlns="http://www.w3.org/2000/svg" ...>German SVG...</svg>`,
    all: `<svg xmlns="http://www.w3.org/2000/svg" ...>Computer SVG...</svg>`,
  };

  // Method to retrieve an SVG for a specific language
  static getIcon(language: string): string {
    return this.languageIcons[language] || this.languageIcons['selected.language'];
  }
}
