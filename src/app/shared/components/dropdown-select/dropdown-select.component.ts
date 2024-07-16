import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-dropdown-select',
  standalone: true,
  imports: [ CommonModule, FormsModule, TranslateModule ],
  templateUrl: './dropdown-select.component.html'
})
export class DropdownSelectComponent {

  @Input() options: any[] = []
  @Input() selectedValue: string = ''
  @Input() label: string = ''
  @Output() valueChange = new EventEmitter<string>()

  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.valueChange.emit(selectElement.value);
  }
}
