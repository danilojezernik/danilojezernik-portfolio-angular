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
  { name: 'title', label: 'Naslov', type: 'text', validators: [ Validators.required ] },
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

/**
 * formUserConfig defines the configuration for the form fields used in the projects form.
 */
export const formUserConfig: FormFieldConfig[] = [
  { name: 'full_name', label: 'Ime in priimek', type: 'text', validators: [ Validators.required ] },
  { name: 'username', label: 'Uporabniško ime', type: 'text', validators: [ Validators.required ] },
  { name: 'email', label: 'email', type: 'email', validators: [ Validators.required, Validators.email ] },
  { name: 'profession', label: 'Poklic', type: 'text', validators: [] },
  { name: 'technology', label: 'Tehnologije', type: 'text', validators: [] },
  { name: 'description', label: 'description', type: 'text', validators: [ Validators.required ] },
  { name: 'hashed_password', label: 'hashed_password', type: 'text', validators: [] },
  { name: 'confirmed', label: 'confirmed', type: 'checkbox', validators: [] },
  { name: 'registered', label: 'registered', type: 'checkbox', validators: [] },
  { name: 'blog_notification', label: 'blog_notification', type: 'checkbox', validators: [] }
]

/**
 * formTechnologyConfig defines the configuration for the form fields used in the technology form.
 * */
export const formTechnologyConfig: FormFieldConfig[] = [
  { name: 'technology', label: 'Tehnologija', type: 'text', validators: [ Validators.required ] },
  { name: 'title', label: 'Naslov', type: 'text', validators: [ Validators.required ] },
  { name: 'subtitle', label: 'Podnaslov', type: 'text', validators: [] },
  { name: 'vsebina', label: 'Vsebina', type: 'text', validators: [ Validators.required, Validators.minLength(10) ] },
  { name: 'image', label: 'Image', type: 'text', validators: [] }
]

/**
 * formExperiencesConfig defines the configuration for the form fields used in the experiences form.
 * */
export const formExperiencesConfig: FormFieldConfig[] = [
  { name: 'title', label: 'Naslov', type: 'text', validators: [ Validators.required ] },
  { name: 'stack', label: 'Stack', type: 'text', validators: [ Validators.required ] },
  { name: 'framework', label: 'Framework', type: 'text', validators: [ Validators.required ] },
  { name: 'programming_language', label: 'programming_language', type: 'text', validators: [ Validators.required ] },
  { name: 'company', label: 'company', type: 'text', validators: [] },
  { name: 'employee', label: 'employee', type: 'checkbox', validators: [ Validators.required ] },
  { name: 'tasks', label: 'tasks', type: 'text', validators: [] },
  { name: 'company_start', label: 'company_start', type: 'text', validators: [] },
  { name: 'company_end', label: 'company_end', type: 'text', validators: [] },
]

/**
 * formLinksConfig defines the configuration for the form fields used in the links form.
 * */
export const formLinksConfig: FormFieldConfig[] = [
  { name: 'title', label: 'Naslov', type: 'text', validators: [ Validators.required ] },
  { name: 'link', label: 'Povezava', type: 'text', validators: [ Validators.required ] },
]

/**
 * formBooksConfig defines the configuration for the form fields used in the books form.
 * */
export const formBooksConfig: FormFieldConfig[] = [
  { name: 'naslov', label: 'Naslov', type: 'text', validators: [ Validators.required ] },
  { name: 'tehnologija', label: 'tehnologija', type: 'text', validators: [ Validators.required ] },
  { name: 'podnaslov', label: 'podnaslov', type: 'text', validators: [] },
  { name: 'vsebina', label: 'vsebina', type: 'text', validators: [ Validators.required, Validators.minLength(10) ] },
  { name: 'image', label: 'vsebina', type: 'text', validators: [] },
]

/**
 * formSubscriberConfig defines the configuration for the form fields used in the subscriber form.
 * */
export const formSubscriberConfig: FormFieldConfig[] = [
  { name: 'name', label: 'name', type: 'text', validators: [ Validators.required ] },
  { name: 'surname', label: 'surname', type: 'text', validators: [ Validators.required ] },
  { name: 'email', label: 'email', type: 'email', validators: [ Validators.required, Validators.email ] },
  { name: 'confirmed', label: 'confirmed', type: 'checkbox', validators: [] },
]
