# DropdownSelectComponent for Public Use

## Description

The `DropdownSelectComponent` is a reusable, standalone Angular component that provides a customizable dropdown selection. It is designed to be easily integrated into any Angular application and supports translation through the `@ngx-translate/core` module.

## Features

- Accepts an array of options to display in the dropdown.
- Binds to a selected value.
- Emits an event when the selected value changes.
- Supports dynamic labeling and translation of options and labels.

## Usage

### Component Structure

The component is structured with three input properties and one output property:

- `options`: An array of options to display in the dropdown.
- `selectedValue`: The currently selected value.
- `label`: The label for the dropdown.
- `valueChange`: An event emitter that notifies the parent component of value changes.

### HTML Template

The HTML template for the component uses Tailwind CSS for styling and `@ngx-translate/core` for translation.

### Code Implementation

#### Component TypeScript

```typescript
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
```

#### Component HTML Template

```html
<!-- Dropdown to select the language for filtering - START -->
<div class="relative inline-block w-64">
  <label for="dropdown-select" class="block text-sm font-medium text-gray-700">{{ label | translate }}</label>
  <select id="dropdown-select" [(ngModel)]="selectedValue" (change)="onSelectChange($event)"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
    <option *ngFor="let option of options" [value]="option">{{ option | translate }}</option>
  </select>
</div>
<!-- Dropdown to select the language for filtering - END -->
```

### Example Usage

To use the `DropdownSelectComponent` in a parent component, follow these steps:

1. Import the `DropdownSelectComponent` into your parent component.
2. Provide the necessary input properties (`options`, `selectedValue`, and `label`).
3. Handle the `valueChange` event to get the selected value.

#### Parent Component TypeScript

```typescript
import { Component } from '@angular/core';
import { DropdownSelectComponent } from './path-to-dropdown-select.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: [ './parent.component.scss' ]
})
export class ParentComponent {
  // Array of options for the dropdown
  languageOptions = [ 'Typescript', 'JavaScript', 'CSS', 'Python' ];

  // Selected value for the dropdown
  selectedLanguage = 'Typescript';

  // Label for the dropdown
  dropdownLabel = 'Select Language';

  /**
   * Method to handle value changes from the dropdown.
   * @param newValue - The new selected value
   */
  onLanguageChange(newValue: string): void {
    console.log('Selected Language:', newValue);
    this.selectedLanguage = newValue;
  }
}
```

#### Parent Component HTML Template

```html
<!-- Use the DropdownSelectComponent -->
<app-dropdown-select [options]="languageOptions"
                     [selectedValue]="selectedLanguage"
                     [label]="dropdownLabel"
                     (valueChange)="onLanguageChange($event)">
</app-dropdown-select>
```

### Conclusion

The `DropdownSelectComponent` is a flexible and reusable component for creating dropdown menus in Angular applications. By following the usage example, you can easily integrate it into your projects and customize it according to your needs.
