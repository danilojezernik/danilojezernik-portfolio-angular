import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [ CommonModule, TranslateModule ],
  templateUrl: './go-back.component.html'
})
export class GoBackComponent {

  _back = inject(Location)

  goBack() {
    this._back.back()
  }

}
