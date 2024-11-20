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

  // Input property to accept an array of options for the dropdown
  @Input() options: any[] = [];

  // Input property to accept the selected value for the dropdown
  @Input() selectedValue: string = '';

  // Input property to accept the label for the dropdown
  @Input() label: string = '';

  // Output event emitter to notify parent component of value changes
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Method to handle the change event of the dropdown.
   * - Casts the event target to HTMLSelectElement and emits the selected value.
   */
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.valueChange.emit(selectElement.value);
  }
}
