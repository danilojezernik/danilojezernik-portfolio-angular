import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldConfig } from "../../../models/form-field-config.model";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { BUTTONS } from "../../global-const/global.const";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonAdminComponent } from "../../components/button-admin/button-admin.component";
import {sharedEditorConfig} from "../editor-configs/textarea-config";
import {AngularEditorConfig, AngularEditorModule} from "@kolkov/angular-editor";
import {sharedEditorConfigClient} from "../editor-configs/email-config";

/**
 * @Component ReusableFormEditComponent
 * A reusable form component designed to handle form rendering and submission logic for editing purposes.
 */
@Component({
  selector: 'app-reusable-form-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, ButtonAdminComponent, AngularEditorModule],
  templateUrl: './reusable-form-edit.component.html'
})
export class ReusableFormEditComponent {

  // Injecting FormBuilder service to handle form creation
  private _formBuilder = inject(FormBuilder);

  // Angular kolkov configs
  editorTextareaConfig: AngularEditorConfig = sharedEditorConfig
  editorEmailConfig: AngularEditorConfig = sharedEditorConfigClient

  // Input property to accept form configuration array
  @Input() formConfig: FormFieldConfig[] = [];

  // Input property to accept form data to populate the form fields
  @Input() formData: any = {};

  // Adding rows to the textarea
  @Input() rows?: number;

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
