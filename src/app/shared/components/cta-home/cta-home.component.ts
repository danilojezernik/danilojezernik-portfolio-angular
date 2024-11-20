import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cta-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cta-home.component.html'
})
export class CtaHomeComponent {

}
