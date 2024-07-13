# Reusable Form Edit Component

The `ReusableFormEditComponent` is a dynamic form generator that creates form controls based on a provided configuration. This component is highly customizable and can be used to create different forms for editing purposes by just changing the configuration.

## Overview

The `ReusableFormEditComponent` uses Angular's reactive forms to dynamically generate form controls based on the configuration provided by the parent component. This allows for creating flexible and reusable forms for editing data.

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

## Reusable Form Edit Component Code

### TypeScript

The `ReusableFormEditComponent` dynamically generates form controls based on the provided configuration and populates them with existing data:

```typescript
import { Component, EventEmitter, inject, Input, Output, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldConfig } from "../../models/form-field-config.model";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { BUTTONS } from "../../global-const/global.const";

@Component({
  selector: 'app-reusable-form-edit',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './reusable-form-edit.component.html'
})
export class ReusableFormEditComponent implements OnInit {

  // Injecting FormBuilder service to handle form creation
  private _formBuilder = inject(FormBuilder);

  // Input property to accept form configuration array
  @Input() formConfig: FormFieldConfig[] = [];

  // Input property to accept form data to populate the form fields
  @Input() formData: any = {};

  // Output property to emit the form data when the form is submitted
  @Output() formSubmit = new EventEmitter<any>();

  // FormGroup instance to manage the form structure and validation
  form: FormGroup = this._formBuilder.group({});

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Initializes the form with the given configuration and data.
   */
  ngOnInit() {
    // Initialize the form when the component is initialized
    this.initializeForm();
  }

  /**
   * @method ngOnChanges
   * Lifecycle hook that is called when any data-bound property of a directive changes.
   * Updates the form values if the formData input changes.
   *
   * @param changes - An object of changes to the data-bound input properties
   */
  ngOnChanges(changes: SimpleChanges) {
    // Check if formData has changed and if the form is already initialized
    if (changes['formData'] && this.form) {
      // Update the form values if formData changes
      this.updateFormValues();
    }
  }

  /**
   * @method initializeForm
   * Initializes the form controls based on the provided form configuration.
   */
  initializeForm() {
    // Loop through each field in the form configuration array
    this.formConfig.forEach(field => {
      // Get validators for the field, if any
      const validators = field.validators || [];
      // Add control to the form with initial value and validators
      this.form.addControl(field.name, this._formBuilder.control(this.formData[field.name] || '', validators));
    });
  }

  /**
   * @method updateFormValues
   * Updates the form control values based on the provided form data.
   */
  updateFormValues() {
    // Loop through each field in the form configuration array
    this.formConfig.forEach(field => {
      // Check if the form contains the control for the field
      if (this.form.contains(field.name)) {
        // Set the value of the form control with the corresponding form data
        this.form.controls[field.name].setValue(this.formData[field.name] || '');
      }
    });
  }

  /**
   * @method onCheckboxChange
   * Handles the change event for checkbox inputs.
   *
   * @param fieldName - The name of the form control for the checkbox.
   */
  onCheckboxChange(fieldName: string) {
    const currentValue = this.form.controls[fieldName].value;
    // Toggle the checkbox value
    this.form.controls[fieldName].setValue(!currentValue);
  }


  /**
   * @method onSubmit
   * Handles the form submission. Emits the form data if the form is valid.
   */
  onSubmit() {
    // Check if the form is valid before submitting
    if (this.form.valid) {
      // Log the form data to check the values being submitted
      const formData = this.form.value;

      // Process form data if necessary
      this.processFormData(formData);

      // Emit the form data when the form is submitted
      this.formSubmit.emit(formData);
    }
  }

  /**
   * @method processFormData
   * Ensures proper data format before emitting the form data.
   *
   * @param formData - The form data to be processed.
   */
  processFormData(formData: any) {
    // Ensure optional text fields are set to an empty string if no input is provided
    this.formConfig.forEach(field => {
      if (field.type === 'text' && !formData[field.name]) {
        formData[field.name] = '';
      }
      // Ensure checkbox values are boolean
      if (field.type === 'checkbox' && typeof formData[field.name] !== 'boolean') {
        formData[field.name] = !!formData[field.name];
      }
    });
  }

  protected readonly BUTTONS = BUTTONS;
}
```

### HTML Template

The template dynamically renders form controls based on the configuration and updates their values:

```html

<form class="flex flex-col" [formGroup]="form" (ngSubmit)="onSubmit()">
  <div *ngFor="let field of formConfig">
    <label [for]="field.name">{{ field.label }}</label>
    <input class="w-full" *ngIf="field.type === 'text'" [type]="field.type" [id]="field.name" [formControlName]="field.name">
    <input class="w-full" *ngIf="field.type === 'email'" [type]="field.type" [id]="field.name" [formControlName]="field.name">
    <input class="w-full" *ngIf="field.type === 'number'" [type]="field.type" [id]="field.name" [formControlName]="field.name">
    <input class="m-1" *ngIf="field.type === 'checkbox'" [type]="field.type" [id]="field.name" [formControlName]="field.name" (change)="onCheckboxChange(field.name)" [checked]="form.controls[field.name].value">
    <textarea class="w-full" *ngIf="field.type === 'textarea'" [id]="field.name" [formControlName]="field.name"></textarea>

    <div *ngIf="form.controls[field.name].invalid && form.controls[field.name].touched">
      <div *ngIf="form.controls[field.name].errors?.['required']">{{ field.label }} is required</div>
    </div>
  </div>
  <button class="p-2 bg-green-600 text-white" type="submit">{{BUTTONS.edit}}</button>
</form>
```

## Explanation

The `ReusableFormEditComponent` is a flexible component designed to dynamically create and update form fields based on the provided configuration and data. This reduces redundancy and allows for easy form creation and maintenance.

### Key Features:

- **Dynamic Form Generation**: Automatically generates and updates form controls based on the provided configuration.
- **Validation**: Supports Angular's form validation through configurable validators.
- **Reusability**: Can be used across different parts of your application by changing the configuration.

By using the `ReusableFormEditComponent`, you can ensure a consistent and efficient way to handle forms for editing data in your application, minimizing code duplication and enhancing maintainability.

# Blog Edit By ID Admin Component

The `BlogEditByIdAdminComponent` handles the editing of a blog post by its ID in the admin interface. It fetches the blog data based on the ID from the route parameters and uses the `ReusableFormEditComponent` to handle the form rendering and submission.

## Component Usage

### HTML Template

This template integrates the `ReusableFormEditComponent` with the form configuration and data.

```html

<app-reusable-form-edit
  [formConfig]="formBlogConfig"
  [formData]="formData"
  (formSubmit)="editBlog($event)"
></app-reusable-form-edit>
```

### TypeScript

In your component, import the necessary services and form configuration, and define the methods to fetch and update blog data:

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from "../../services/api/blog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { formBlogConfig } from "../../global-const/form-config";

@Component({
  selector: 'app-blog-edit-by-id-admin',
  templateUrl: './blog-edit-by-id-admin.component.html'
})
export class BlogEditByIdAdminComponent implements OnInit {

  private _blogService = inject(BlogService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  formData: any = {};

  ngOnInit() {
    const blogId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    this._blogService.getBlogById(blogId).pipe(
      map(data => {
        this.formData = data;
      })
    ).subscribe();
  }

  editBlog(formValue: any) {
    const blogId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    this._blogService.editBlogById(blogId, formValue).subscribe(() => {
      this._router.navigate([ '/blog-admin' ]);
    });
  }

  protected readonly formBlogConfig = formBlogConfig;
}
```

## Explanation

The `BlogEditByIdAdminComponent` handles fetching the blog data based on the ID from the route parameters and populates the form with this data. It uses the `ReusableFormEditComponent` for rendering the form and handling the submission.

### Key Features:

- **Dynamic Data Binding**: Populates form fields with existing data and updates the data on changes.
- **Form Reusability**: Uses `ReusableFormEditComponent` for consistent form rendering and submission handling.
- **Navigation**: Handles navigation after the form submission to ensure a smooth user experience.

By using these components, you can efficiently manage the editing of blog posts in your admin interface, ensuring a consistent and reusable approach to form handling.
