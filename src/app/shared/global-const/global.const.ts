// Dialog dimensions for various components

// Dimensions for the admin dialog
const ADMIN_GET_BY_ID = {
  height: '50%', // Set the height of the admin dialog to 50% of the viewport
  width: '50%'   // Set the width of the admin dialog to 50% of the viewport
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

// Menu items for the header component
// MENU ITEMS FOR HEADER COMPONENT
export const MENU: { menu: string, path: string }[] = [
  {menu: 'menu.home', path: '/'},
  {menu: 'menu.about', path: '/about'},
  {menu: 'menu.users', path: '/users'},
  {menu: 'menu.blog', path: '/blog'},
  {menu: 'menu.books', path: '/books'},
  {menu: 'menu.github', path: '/github'},
  {menu: 'menu.contact', path: '/contact'},
  {menu: 'menu.register', path: '/register'}
]

// MENU ITEMS FOR LOGIN AND LOGOUT HEADER COMPONENT
export const LOGIN_LOGOUT: { menu: string, path: string, condition: string }[] = [
  {menu: 'menu.login', path: '/login', condition: 'loggedOut'},
  {menu: 'menu.logout', path: '/logout', condition: 'loggedIn'},
]

// LINK ITEMS FOR ABOUT ME PAGE COMPONENT
export const ABOUT_ME: { menu: string, path: string }[] = [
  {menu: 'menu.biography', path: '/biography'},
  {menu: 'menu.experiences', path: '/experiences'},
  {menu: 'menu.media', path: '/media'},
]

// LINK ITEMS FOR MY RESOURCES FOR ABOUT ME COMPONENT
export const MY_RESOURCES: { menu: string, path: string }[] = [
  {menu: 'menu.projects', path: '/projects'},
  {menu: 'menu.technology', path: '/technology'},
  {menu: 'menu.github', path: '/github'},
  {menu: 'menu.books', path: '/books'},
  {menu: 'menu.links', path: '/links'},
]


// Menu items for the admin menu component
// MENU ITEMS FOR ADMIN MENU COMPONENT
export const ADMIN_MENU: { menu: string, path: string }[] = [
  {menu: 'menu.blog', path: '/blog-admin'},
  {menu: 'menu.media', path: '/media'},
  {menu: 'menu.users', path: '/users-admin'},
  {menu: 'menu.email', path: '/emails-admin'},
  {menu: 'menu.technology', path: '/technology-admin'},
  {menu: 'menu.links', path: '/links-admin'},
  {menu: 'menu.experiences', path: '/experiences-admin'},
  {menu: 'menu.projects', path: '/projects-admin'},
  {menu: 'menu.book', path: '/books-admin'},
  {menu: 'menu.newsletter', path: '/newsletter-admin'},
  {menu: 'menu.subscriber', path: '/subscriber-admin'},
]

export const MEDIA_MENU = [
  {menu: 'menu.about-me-media', path: '/media-about-me'},
  {menu: 'menu.media-books', path: '/media-books'},
]

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
