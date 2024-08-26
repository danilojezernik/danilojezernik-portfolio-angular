import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanvasBoxComponent} from "../../../../shared/components/canvas-box/canvas-box.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CanvasBoxComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
