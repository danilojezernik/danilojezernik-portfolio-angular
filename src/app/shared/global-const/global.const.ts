// Dialog dimensions for various components

// Dimensions for the admin dialog
const ADMIN_GET_BY_ID = {
  height: '50%', // Set the height of the admin dialog to 50% of the viewport
  width: '50%'   // Set the width of the admin dialog to 50% of the viewport
}

// Exported dimensions object for dialogs
export const DIALOG_DIMENSIONS = {
  admin: ADMIN_GET_BY_ID // Dialog dimensions specifically for the admin component
}

// Enum for button labels
export enum BUTTONS {
  read = 'Beri',    // Label for the read button
  edit = 'Uredi',   // Label for the edit button
  add = 'Dodaj',    // Label for the add button
  delete = 'Izbriši'// Label for the delete button
}

// Menu items for the header component
// MENU ITEMS FOR HEADER COMPONENT
export const MENU: { menu: string, path: string, condition?: 'loggedIn' | 'loggedOut' }[] = [
  { menu: 'menu.home', path: '/' },
  { menu: 'menu.biography', path: '/biography' },
  { menu: 'menu.experiences', path: '/experiences' },
  { menu: 'menu.projects', path: '/projects' },
  { menu: 'menu.blog', path: '/blog' },
  { menu: 'menu.github', path: '/github' },
  { menu: 'menu.media', path: '/media' },
  { menu: 'menu.books', path: '/books' },
  { menu: 'menu.links', path: '/links' },
  { menu: 'menu.users', path: '/users' },
  { menu: 'menu.contact', path: '/contact' },
  { menu: 'menu.register', path: '/register' },
  { menu: 'menu.login', path: '/login', condition: 'loggedOut' },
  { menu: 'menu.logout', path: '/logout', condition: 'loggedIn' },
];


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
