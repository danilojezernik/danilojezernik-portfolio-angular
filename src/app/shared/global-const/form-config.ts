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
  { name: 'title', label: 'title', type: 'text', validators: [ Validators.required ] },
  { name: 'podnaslov', label: 'podnaslov', type: 'text', validators: [ Validators.required ] },
  { name: 'author', label: 'author', type: 'text', validators: [ Validators.required ] },
  { name: 'kategorija', label: 'kategorija', type: 'text', validators: [ Validators.required ] },
  { name: 'vsebina', label: 'vsebina', type: 'textarea', validators: [ Validators.required, Validators.min(10) ] },
  { name: 'image', label: 'image', type: 'text', validators: [ Validators.required ] }
]

/**
 * formProjectsConfig defines the configuration for the form fields used in the projects form.
 */
export const formProjectsConfig: FormFieldConfig[] = [
  { name: 'title', label: 'title', type: 'text', validators: [ Validators.required ] },
  { name: 'subtitle', label: 'subtitle', type: 'text', validators: [ Validators.required ] },
  { name: 'category', label: 'category', type: 'text', validators: [ Validators.required ] },
  { name: 'content', label: 'content', type: 'textarea', validators: [ Validators.required, Validators.minLength(10) ] },
  { name: 'github', label: 'github', type: 'text', validators: [] },
  { name: 'website', label: 'website', type: 'text', validators: [] },
  { name: 'image', label: 'image', type: 'text', validators: [] }
]

/**
 * formUserConfig defines the configuration for the form fields used in the projects form.
 */
export const formUserConfig: FormFieldConfig[] = [
  { name: 'full_name', label: 'full_name', type: 'text', validators: [ Validators.required ] },
  { name: 'username', label: 'username', type: 'text', validators: [ Validators.required ] },
  { name: 'email', label: 'email', type: 'email', validators: [ Validators.required, Validators.email ] },
  { name: 'profession', label: 'profession', type: 'text', validators: [] },
  { name: 'technology', label: 'technology', type: 'text', validators: [] },
  { name: 'description', label: 'description', type: 'text', validators: [ Validators.required ] },
  { name: 'role', label: 'role', type: 'select',
  options: [
  { value: 'visitor', label: 'Visitor' },
  { value: 'admin', label: 'Admin' }
], validators: [] },
  { name: 'hashed_password', label: 'hashed_password', type: 'text', validators: [] },
  { name: 'confirmed', label: 'confirmed', type: 'checkbox', validators: [] },
  { name: 'registered', label: 'registered', type: 'checkbox', validators: [] },
  { name: 'blog_notification', label: 'blog_notification', type: 'checkbox', validators: [] }
]

/**
 * formUserPublicConfig defines the configuration for the form fields used in the projects form.
 */
export const formUserPublicConfig: FormFieldConfig[] = [
  { name: 'full_name', label: 'full_name', type: 'text', validators: [ Validators.required ] },
  { name: 'profession', label: 'profession-position', type: 'select',
    options: [
      { value: 'CEO/Co-founder', label: 'ceo-cofounder' },
      { value: 'CTO (Chief Technology Officer)', label: 'cto' },
      { value: 'SEO & Marketing Specialist', label: 'seo-marketing' },
      { value: 'React Developer', label: 'react-developer' },
      { value: 'Vue.js Developer', label: 'vuejs-developer' },
      { value: 'Angular Developer', label: 'angular-developer' },
      { value: 'Python Developer', label: 'python-developer' },
      { value: 'Java Developer', label: 'java-developer' },
      { value: 'Web Designer', label: 'web-designer' },
      { value: 'Graphic Designer', label: 'graphic-designer' },
      { value: 'UI/UX Designer', label: 'ui-ux-designer' },
      { value: 'Frontend Developer', label: 'frontend-developer' },
      { value: 'Backend Developer', label: 'backend-developer' },
      { value: 'Full Stack Developer', label: 'fullstack-developer' },
      { value: 'DevOps Engineer', label: 'devops-engineer' },
      { value: 'Data Scientist', label: 'data-scientist' },
      { value: 'Data Analyst', label: 'data-analyst' },
      { value: 'Database Administrator (DBA)', label: 'database-administrator' },
      { value: 'Cloud Architect', label: 'cloud-architect' },
      { value: 'Cybersecurity Specialist', label: 'cybersecurity-specialist' },
      { value: 'Mobile App Developer', label: 'mobile-app-developer' },
      { value: 'Project Manager', label: 'project-manager' },
      { value: 'Product Manager', label: 'product-manager' },
      { value: 'IT Support Specialist', label: 'it-support-specialist' },
      { value: 'QA (Quality Assurance) Engineer', label: 'qa-engineer' },
      { value: 'Software Engineer', label: 'software-engineer' },
      { value: 'Network Administrator', label: 'network-administrator' },
      { value: 'System Administrator', label: 'system-administrator' },
      { value: 'Scrum Master', label: 'scrum-master' },
      { value: 'Business Analyst', label: 'business-analyst' }
    ], validators: [Validators.required] },
  { name: 'technology', label: 'register-technology', type: 'text', validators: [Validators.required] },
  { name: 'description', label: 'register-description', type: 'text', validators: [ Validators.required ] },
  { name: 'email', label: 'email', type: 'email', validators: [ Validators.required, Validators.email ] },
  { name: 'username', label: 'username', type: 'text', validators: [ Validators.required ] },
  { name: 'hashed_password', label: 'password', type: 'text', validators: [Validators.required] },
  { name: 'confirmed', label: 'get-newsletter', type: 'checkbox', validators: [] },
  { name: 'blog_notification', label: 'blog-notification', type: 'checkbox', validators: [] }
]

/**
 * formTechnologyConfig defines the configuration for the form fields used in the technology form.
 * */
export const formTechnologyConfig: FormFieldConfig[] = [
  { name: 'technology', label: 'technology', type: 'text', validators: [ Validators.required ] },
  { name: 'title', label: 'title', type: 'text', validators: [ Validators.required ] },
  { name: 'subtitle', label: 'subtitle', type: 'text', validators: [] },
  { name: 'vsebina', label: 'vsebina', type: 'textarea', validators: [ Validators.required, Validators.minLength(10) ] },
  { name: 'image', label: 'Image', type: 'text', validators: [] }
]

/**
 * formExperiencesConfig defines the configuration for the form fields used in the experiences form.
 * */
export const formExperiencesConfig: FormFieldConfig[] = [
  { name: 'title', label: 'title', type: 'text', validators: [ Validators.required ] },
  { name: 'stack', label: 'stack', type: 'text', validators: [ Validators.required ] },
  { name: 'framework', label: 'framework', type: 'text', validators: [ Validators.required ] },
  { name: 'programming_language', label: 'programming_language', type: 'text', validators: [ Validators.required ] },
  { name: 'company', label: 'company', type: 'text', validators: [] },
  { name: 'tasks', label: 'tasks', type: 'text', validators: [] },
  { name: 'company_start', label: 'company_start', type: 'text', validators: [] },
  { name: 'company_end', label: 'company_end', type: 'text', validators: [] },
  { name: 'employee', label: 'employee', type: 'checkbox', validators: [ Validators.required ] },
]

/**
 * formLinksConfig defines the configuration for the form fields used in the links form.
 * */
export const formLinksConfig: FormFieldConfig[] = [
  { name: 'title', label: 'title', type: 'text', validators: [ Validators.required ] },
  { name: 'link', label: 'link', type: 'text', validators: [ Validators.required ] },
]

/**
 * formBooksConfig defines the configuration for the form fields used in the books form.
 * */
export const formBooksConfig: FormFieldConfig[] = [
  { name: 'naslov', label: 'naslov', type: 'text', validators: [ Validators.required ] },
  { name: 'tehnologija', label: 'tehnologija', type: 'text', validators: [ Validators.required ] },
  { name: 'author', label: 'author', type: 'text', validators: [ Validators.required ] },
  { name: 'podnaslov', label: 'podnaslov', type: 'text', validators: [] },
  { name: 'buy_url', label: 'buy_url', type: 'text', validators: [] },
  { name: 'vsebina', label: 'vsebina', type: 'textarea', validators: [ Validators.required, Validators.minLength(10) ] },
  { name: 'image', label: 'image', type: 'text', validators: [] },
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

/**
 * formNewsletterConfig defines the configuration for the form fields used in the newsletter form.
 * */
export const formNewsletterConfig: FormFieldConfig[] = [
  { name: 'title', label: 'title', type: 'text', validators: [ Validators.required ] },
  { name: 'content', label: 'content', type: 'textarea', validators: [ Validators.required ] },
]

/**
 * formNewsletterConfig defines the configuration for the form fields used in the newsletter form.
 * */
export const formCommentConfig: FormFieldConfig[] = [
  { name: 'author', label: 'author', type: 'text', validators: [ Validators.required ] },
  { name: 'content', label: 'content', type: 'textarea', validators: [ Validators.required ] },
]

/**
 * formContactConfig defines the configuration for the form fields used in the newsletter form.
 * */
export const formContactConfig: FormFieldConfig[] = [
  { name: 'full_name', label: 'full_name', type: 'text', validators: [ Validators.required ] },
  { name: 'email', label: 'Email', type: 'email', validators: [ Validators.required, Validators.email ] },
  { name: 'message', label: 'message', type: 'text', validators: [ Validators.required, Validators.min(10) ] }
]

/**
 * formTechnologiesConfig defines the configuration for the form fields used in the angular form.
 * */
export const formTechnologiesConfig: FormFieldConfig[] = [
  { name: 'question', label: 'question', type: 'text', validators: [ Validators.required ] },
  { name: 'answer', label: 'answer', type: 'text', validators: [ Validators.required ] },
  { name: 'image', label: 'image', type: 'email', validators: [] },
]
