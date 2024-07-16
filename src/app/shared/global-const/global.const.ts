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
  read = 'button.read',    // Label for the read button
  edit = 'button.edit',   // Label for the edit button
  add = 'button.add',    // Label for the add button
  delete = 'button.delete',// Label for the delete button
  back = 'button.back' // Label for the back button
}

// Menu items for the header component
// MENU ITEMS FOR HEADER COMPONENT
export const MENU: { menu: string, path: string, condition?: 'loggedIn' | 'loggedOut' }[] = [
  { menu: 'menu.home', path: '/' },
  { menu: 'menu.biography', path: '/biography' },
  { menu: 'menu.experiences', path: '/experiences' },
  { menu: 'menu.projects', path: '/projects' },
  { menu: 'menu.technology', path: '/technology' },
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

// Menu items for the admin menu component
// MENU ITEMS FOR ADMIN MENU COMPONENT
export const ADMIN_MENU: { menu: string, path: string }[] = [
  { menu: 'menu.blog', path: '/blog-admin' },
  { menu: 'menu.users', path: '/users-admin' },
  { menu: 'menu.email', path: '/emails-admin' },
  { menu: 'menu.technology', path: '/technology-admin' },
  { menu: 'menu.links', path: '/links-admin' },
  { menu: 'menu.experiences', path: '/experiences-admin' },
  { menu: 'menu.projects', path: '/projects-admin' },
  { menu: 'menu.book', path: '/books-admin' },
  { menu: 'menu.newsletter', path: '/newsletter-admin' },
  { menu: 'menu.subscriber', path: '/subscriber-admin' },
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

// Select language options for the GitHub component
export const SELECT_LANGUAGE = [
  'TypeScript', 'JavaScript', 'Python', 'Vue', 'Kotlin', 'HTML', 'All languages'
]
