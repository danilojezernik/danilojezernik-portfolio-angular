# Reusable Form Component

The `ReusableFormComponent` is a dynamic form generator that creates form controls based on a provided configuration. This component is highly customizable and can be used to create different forms by just changing the configuration.

## Overview

The `ReusableFormComponent` uses Angular's reactive forms to dynamically generate form controls based on the configuration provided by the parent component. This allows for creating flexible and reusable forms.

## Form Configuration

The form configuration is defined as an array of `FormFieldConfig` objects. Each object specifies the name, label, type, and validators for a form field.

### Example Configurations

#### Blog Form Configuration

```typescript
import { Validators } from "@angular/forms";
import { FormFieldConfig } from "../../models/form-field-config.model";

export const formBlogConfig: FormFieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', validators: [ Validators.required ] },
  { name: 'subtitle', label: 'Subtitle', type: 'text', validators: [ Validators.required ] },
  { name: 'category', label: 'Category', type: 'text', validators: [ Validators.required ] },
  { name: 'content', label: 'Content', type: 'text', validators: [ Validators.required, Validators.minLength(10) ] },
  { name: 'image', label: 'Image', type: 'text', validators: [ Validators.required ] }
];
```

#### User Form Configuration

```typescript
import { Validators } from "@angular/forms";
import { FormFieldConfig } from "path-to-form-field-config.model";

export const formUserConfig: FormFieldConfig[] = [
  { name: 'full_name', label: 'Full name', type: 'text', validators: [ Validators.required ] },
  { name: 'username', label: 'Username', type: 'text', validators: [ Validators.required ] },
  { name: 'email', label: 'Email', type: 'email', validators: [ Validators.required, Validators.email ] },
  { name: 'profession', label: 'Profession', type: 'text', validators: [] },
  { name: 'technology', label: 'Technology', type: 'text', validators: [] }
];
```

## Component Usage

### HTML Template

To use the `ReusableFormComponent`, provide the form configuration and handle the form submission event:

```html

<app-reusable-form
  [config]="formUserConfig"
  [submitLabel]="'Add user'"
  (formSubmit)="addUser($event)"
></app-reusable-form>
```

### TypeScript

In your component, import the form configuration and define the method to handle form submission:

```typescript
import { Component } from '@angular/core';
import { formUserConfig } from 'path-to-your-config';
import { User } from "path-to-user-model";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html'
})
export class UserAddComponent {
  protected readonly formUserConfig = formUserConfig;

  addUser(formData: User) {
    console.log('User data:', formData);
    // Handle form submission logic here
  }
}
```

## Reusable Form Component Code

### TypeScript

The `ReusableFormAddComponent` dynamically generates form controls based on the provided configuration:

```typescript
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { FormFieldConfig } from "path-to-form-field-config.model";

@Component({
  selector: 'app-reusable-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './reusable-form-add.component.html'
})
export class ReusableFormAddComponent implements OnInit {

  /**
   * Injecting FormBuilder dependency using Angular's dependency injection mechanism.
   * FormBuilder helps in creating form controls.
   */
  private _formBuilder = inject(FormBuilder);

  /**
   * Input property to receive form configuration from the parent component.
   * The configuration is an array of FormFieldConfig objects that define the form fields.
   */
  @Input() config: FormFieldConfig[] = [];

  /**
   * Input property to receive the label for the submit button from the parent component.
   */
  @Input() submitLabel!: string;

  /**
   * Output property to emit form data to the parent component upon form submission.
   * EventEmitter is used to emit custom events.
   */
  @Output() formSubmit = new EventEmitter<any>();

  /**
   * FormGroup instance to manage the state of the form including its controls, their values, and their validity.
   */
  form!: FormGroup;

  /**
   * ngOnInit is a lifecycle hook called by Angular to indicate that Angular is done creating the component.
   * It is used here to initialize the form controls based on the provided configuration.
   */
  ngOnInit() {
    /**
     * Reducing the config array to an object where keys are field names and values are arrays containing
     * the initial value and validators for the form controls.
     *
     * reduce<{ [key: string]: [ any, ValidatorFn[] ] }>:
     * - { [key: string]: [ any, ValidatorFn[] ] }: TypeScript type definition for the accumulator object.
     * - acc: Accumulator object that stores the form controls.
     * - field: Current field configuration from the config array.
     */
    const formControls = this.config.reduce<{ [key: string]: [ any, ValidatorFn[] ] }>((acc, field) => {
      /**
       * For each field in the config array, create a form control configuration.
       *
       * acc[field.name]: Add a new key-value pair to the accumulator object.
       * - field.name: The name of the form field.
       * - [ field.type === 'checkbox' ? false : '', field.validators || [] ]: Array containing the initial value (false for checkboxes and empty string for others) and the validators.
       * - field.validators || []: If validators are provided in the field configuration, use them; otherwise, use an empty array.
       *
       * acc returns the accumulated object that represents the form controls configuration.
       * field.name returns the name of the current form field being processed.
       * this.config returns the entire configuration array passed from the parent component.
       */
      acc[field.name] = [ field.type === 'checkbox' ? false : '', field.validators || [] ];
      return acc;
    }, {});

    /**
     * Initialize the form using FormBuilder with the generated form controls.
     *
     * this._formBuilder.group(formControls): Creates a FormGroup instance using the form controls configuration.
     */
    this.form = this._formBuilder.group(formControls);
  }

  /**
   * Method to handle form submission.
   * It checks if the form is valid and then emits the form data using the formSubmit EventEmitter.
   */
  onSubmit() {
    if (this.form.valid) {
      // Clone the form value to ensure processing does not affect the original form value.
      const processedFormValue = { ...this.form.value };

      // Iterate over the form configuration to process each field
      this.config.forEach(field => {
        // Ensure optional text fields are set to an empty string if no input is provided
        if (field.type === 'text' && !processedFormValue[field.name]) {
          processedFormValue[field.name] = '';
        }
        // Ensure checkbox values are boolean
        if (field.type === 'checkbox' && typeof processedFormValue[field.name] !== 'boolean') {
          processedFormValue[field.name] = !!processedFormValue[field.name];
        }
      });

      // Log the processed form value for debugging purposes
      console.log('Processed Form Value:', processedFormValue);

      // Emit the processed form data to the parent component
      this.formSubmit.emit(processedFormValue);
    }
  }
}
```

### HTML Template

The template dynamically renders form controls based on the configuration:

```html

<form class="flex flex-col" [formGroup]="form" (ngSubmit)="onSubmit()">
  <div *ngFor="let field of config">
    <label [for]="field.name">{{ field.label }}</label>
    <input class="w-full" *ngIf="field.type === 'text'" [id]="field.name" [formControlName]="field.name" [type]="field.type">
    <input class="w-full" *ngIf="field.type === 'email'" [id]="field.name" [formControlName]="field.name" [type]="field.type">
    <input class="w-full" *ngIf="field.type === 'number'" [id]="field.name" [formControlName]="field.name" [type]="field.type">
    <input class="m-1" *ngIf="field.type === 'checkbox'" [id]="field.name" [formControlName]="field.name" [type]="field.type">
    <input class="w-full" *ngIf="field.type === 'password'" [id]="field.name" [formControlName]="field.name" [type]="field.type">
    <textarea class="w-full" *ngIf="field.type === 'textarea'" [id]="field.name" [formControlName]="field.name"></textarea>

    <div *ngIf="form.controls[field.name].invalid && form.controls[field.name].touched">
      <div *ngIf="form.controls[field.name].errors?.['required']">{{ field.label }} is required</div>
    </div>
  </div>

  <button class="p-2 bg-green-600 text-white" type="submit" [disabled]="form.invalid">{{ submitLabel }}</button>
</form>
```

## Explanation

The `ReusableFormComponent` is a flexible component designed to dynamically create form fields based on the provided configuration. This reduces redundancy and allows for easy form creation and maintenance.

### Key Features:

- **Dynamic Form Generation**: Automatically generates form controls based on the provided configuration.
- **Validation**: Supports Angular's form validation through configurable validators.
- **Reusability**: Can be used across different parts of your application by changing the configuration.

By using the `ReusableFormComponent`, you can ensure a consistent and efficient way to handle forms in your application, minimizing code duplication and enhancing maintainability.
