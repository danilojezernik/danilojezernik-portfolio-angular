// Dialog dimensions for various components

// Dimensions for the admin dialog
const ADMIN_GET_BY_ID = {
  height: '50%', // Set the height of the admin dialog to 50% of the viewport
  width: '100%'   // Set the width of the admin dialog to 50% of the viewport
}

const ADMIN_GET_BY_ID_MOBILE = {
  height: '100%', // Set the height of the admin dialog to 100% of the viewport
  width: '100%'   // Set the width of the admin dialog to 100% of the viewport
}

// Exported dimensions object for dialogs
export const DIALOG_DIMENSIONS = {
  admin: ADMIN_GET_BY_ID, // Dialog dimensions specifically for the admin component
  adminMobile: ADMIN_GET_BY_ID_MOBILE // Dialog dimensions specifically for the admin component on mobile devices
}

// Enum for button labels
export enum BUTTONS {
  read = 'button.read',    // Label for the read button
  edit = 'button.edit',   // Label for the edit button
  add = 'button.add',    // Label for the add button
  delete = 'button.delete',// Label for the delete button
  back = 'button.back' // Label for the back button
}

// Language translations for the header component and Translate service
// Enum for supported languages
export enum TRANSLATE_LANGUAGE {
  si = 'si', // Slovenian lowercase
  SI = 'SI', // Slovenian uppercase
  en = 'en', // English lowercase
  EN = 'EN'  // English uppercase
}

// Exported object for language codes
export const LANGUAGE = {
  si: 'SI', // Slovenian language code
  en: 'EN'  // English language code
}

// Select language options for the GitHub component
export const SELECT_LANGUAGE = [
  'selected.language', 'TypeScript', 'JavaScript', 'Python', 'Vue', 'Kotlin', 'HTML'
]

// Select language options for the Books component
export const SELECT_TECHNOLOGY = [
  'selected.allTechnology', 'TypeScript', 'JavaScript', 'Python', 'Vue', 'Kotlin', 'HTML', 'Angular'
]

// PAGINATION limit
export const PAGINATION ={
  commentLImit: 10,
  limitTextShortening: 200
}
