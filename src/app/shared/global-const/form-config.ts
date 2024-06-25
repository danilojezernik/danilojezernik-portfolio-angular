import { FormFieldConfig } from "../../models/form-field-config.model";
import { Validators } from "@angular/forms";

/**
 * FormConfiguration defines the configuration for the form fields used in the blog form
 * It contains an array of FormFieldConfig objects, each specifying the name, label, type, and validators for a form field.
 *
 *  - `name`: The name of the form field, which is used as the key for form control.
 * - `label`: The label that will be displayed for the form field.
 * - `type`: The type of the form field (e.g., 'text', 'email').
 * - `validators`: An array of Angular validators applied to the form field.
 * */

/**
 * formBlogConfig defines the configuration for the form fields used in the blog form.
 */

export const formBlogConfig: FormFieldConfig[] = [
  { name: 'naslov', label: 'Naslov', type: 'text', validators: [ Validators.required ] },
  { name: 'podnaslov', label: 'Podnaslov', type: 'text', validators: [ Validators.required ] },
  { name: 'kategorija', label: 'Kategorija', type: 'text', validators: [ Validators.required ] },
  { name: 'vsebina', label: 'Vsebina', type: 'text', validators: [ Validators.required, Validators.min(10) ] },
  { name: 'image', label: 'Image', type: 'text', validators: [ Validators.required ] }
]


/**
 * formProjectsConfig defines the configuration for the form fields used in the projects form.
 */
export const formProjectsConfig: FormFieldConfig[] = [
  { name: 'title', label: 'Naslov', type: 'text', validators: [ Validators.required ] },
  { name: 'subtitle', label: 'Podnaslov', type: 'text', validators: [ Validators.required ] },
  { name: 'category', label: 'Kategorija', type: 'text', validators: [ Validators.required ] },
  { name: 'content', label: 'Vsebina', type: 'text', validators: [ Validators.required, Validators.minLength(10) ] },
  { name: 'github', label: 'Github', type: 'text', validators: [] },
  { name: 'website', label: 'Website', type: 'text', validators: [] }
]
