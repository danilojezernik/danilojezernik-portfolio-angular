import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { FormFieldConfig } from "../../../models/form-field-config.model";
import {TranslateModule} from "@ngx-translate/core";

/*************************************************************************************************
 * This component represents a reusable form component that dynamically generates form controls
 * based on configuration provided by the parent component. It implements the OnInit
 * interface to initialize the form on component initialization.
 ************************************************************************************************/

@Component({
  selector: 'app-reusable-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './reusable-form-add.component.html'
})
export class ReusableFormAddComponent implements OnInit {

  /**
   * Injecting FormBuilder dependency using Angular's dependency injection mechanism.
   * FormBuilder helps in creating form controls.
   */
  private _formBuilder = inject(FormBuilder);

  /**
   * Input property to receive form configuration from parent component.
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
