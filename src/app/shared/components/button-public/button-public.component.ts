import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-button-public',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './button-public.component.html'
})
export class ButtonPublicComponent {

  // Input and Output for drawer in technologies
  @Input() questionsTechnologies?: boolean;
  @Output() toggler = new EventEmitter<void>()

  // Emmit toggle function
  toggle() {
    if(this.toggler)
      this.toggler.emit()
  }
}
