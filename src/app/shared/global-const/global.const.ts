// Dialog dimensions for various components

// Dimensions for the admin dialog
const ADMIN_GET_BY_ID = {
  height: '50%',
  width: '100%'
}

// Dimensions for the admin dialog
const EMAIL_GET_BY_ID = {
  height: '80%',
  width: '100%'
}

// Exported dimensions object for dialogs
export const DIALOG_DIMENSIONS = {
  admin: ADMIN_GET_BY_ID, // Dialog dimensions specifically for the admin component
  email: EMAIL_GET_BY_ID, // Dialog dimensions specifically for the admin component
}

// Enum for button labels
export enum BUTTONS {
  read = 'button.read',    // Label for the read button
  edit = 'button.edit',   // Label for the edit button
  add = 'button.add',    // Label for the add button
  delete = 'button.delete',// Label for the delete button
  back = 'button.back', // Label for the back button
  backAdmin = 'button.back-admin' // Label for the back button
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

// Messages that are translated from snackbar
export const SNACKBAR_MESSAGES = {
  reordered: 'snack.reordered',
  registered: 'snack.registration',
  dataChanged: 'snack.dataChanged',
  imageSaved: 'snack.image-saved',
  close: 'snack.close'
}
