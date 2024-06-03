import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './go-back.component.html'
})
export class GoBackComponent {

  _back = inject(Location)

  goBack() {
    this._back.back()
  }

}
