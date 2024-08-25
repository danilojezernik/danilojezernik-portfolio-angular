import {Component, inject, Input} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './go-back.component.html'
})
export class GoBackComponent {

  _back = inject(Location)

  // Show button if in books admin
  @Input() booksAdmin?: boolean

  // Show button if in blog admin
  @Input() blogsAdmin?: boolean

  goBack() {
    this._back.back()
  }

}
