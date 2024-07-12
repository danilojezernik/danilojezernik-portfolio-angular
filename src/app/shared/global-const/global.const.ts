// DIALOG DIMENSIONS
const ADMIN_GET_BY_ID = {
  height: '50%',
  width: '50%'
}

export const DIALOG_DIMENSIONS = {
  admin: ADMIN_GET_BY_ID
}

export enum BUTTONS {
  read = 'Beri',
  edit = 'Uredi',
  add = 'Dodaj',
  delete = 'Izbriši'
}

// MENU ITEMS FOR HEADER COMPONENT
export const MENU: { menu: string, path: string }[] = [
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
]

// LANGUAGE TRANSLATIONS FOR HEADER COMPONENT AND TRANSLATE SERVICE
export enum TRANSLATE_LANGUAGE {
  si = 'si',
  SI = 'SI',
  en = 'en',
  EN = 'EN'
}

export const LANGUAGE = {
  si: 'SI',
  en: 'EN'
}
