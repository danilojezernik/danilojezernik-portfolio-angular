import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldConfig } from "../../../models/form-field-config.model";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

/**
 * @Component ReusableFormEditComponent
 * A reusable form component designed to handle form rendering and submission logic for editing purposes.
 */
@Component({
  selector: 'app-reusable-form-edit',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './reusable-form-edit.component.html'
})
export class ReusableFormEditComponent {

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
   * @method onSubmit
   * Handles the form submission. Emits the form data if the form is valid.
   */
  onSubmit() {
    // Check if the form is valid before submitting
    if (this.form.valid) {
      // Emit the form data when the form is submitted
      this.formSubmit.emit(this.form.value);
    }
  }
}
