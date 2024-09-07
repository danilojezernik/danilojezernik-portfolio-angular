/**
 * Importing ValidatorFn from Angular's forms module.
 * ValidatorFn is a type alias for a function that receives a control and returns either a map of validation errors or null.
 */
import { ValidatorFn } from "@angular/forms";

/**
 * Defining an interface FormFieldConfig that specifies the structure of a form field configuration object.
 * This interface is used to ensure the configuration objects have a consistent shape and types.
 */
export interface FormFieldConfig {
  /**
   * The name property represents the name of the form control.
   * It is a string that uniquely identifies the form control within the form.
   */
  name: string;

  /**
   * The label property represents the label text for the form control.
   * It is a string that will be displayed alongside the form control in the UI.
   */
  label: string;

  options?: { value: string; label: string }[]; // Add options property for select fields

  /**
   * The type property represents the type of the form control.
   * It is a union type that can be one of the following string literals: 'text', 'email', 'number', or 'textarea'.
   * This property determines the type of input element rendered in the form.
   */
  type: 'text' | 'email' | 'date' | 'number' | 'textarea' | 'password' | 'checkbox' | 'select' | 'angular-textarea' | 'angular-email';

  /**
   * The validators property is an optional array of ValidatorFn functions.
   * ValidatorFn is a type that represents a function used for form validation.
   * These functions are applied to the form control to perform validation and enforce rules.
   */
  validators?: ValidatorFn[];
}
