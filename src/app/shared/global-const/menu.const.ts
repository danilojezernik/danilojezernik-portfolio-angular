// Menu items for the header component
// MENU ITEMS FOR HEADER COMPONENT
export const MENU_TOP: { menu: string, path: string }[] = [
  {menu: 'menu.home', path: '/'},
  {menu: 'menu.about', path: '/about'},
  {menu: 'menu.blog', path: '/blog'},
  {menu: 'menu.github', path: '/github'},
  {menu: 'menu.books', path: '/books'},
  {menu: 'menu.users', path: '/users'},
  {menu: 'menu.technologies', path: '/technologies'},
  {menu: 'menu.register', path: '/register'},
  {menu: 'menu.contact', path: '/contact'}
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
  {menu: 'menu.projects', path: '/projects'},
]

// LINK ITEMS FOR MY RESOURCES FOR ABOUT ME COMPONENT
export const MY_RESOURCES: { menu: string, path: string }[] = [
  {menu: 'menu.links', path: '/links'},
]

// Menu items for the admin menu component
// MENU ITEMS FOR ADMIN MENU COMPONENT
export const ADMIN_MENU: { menu: string, path: string, description: string }[] = [
  {menu: 'menu.blog', path: '/blog-admin', description: 'description.admin-menu.blog'},
  {menu: 'menu.comments', path: '/comments-admin', description: 'description.admin-menu.comment'},
  {menu: 'menu.media', path: '/media', description: 'description.admin-menu.media'},
  {menu: 'menu.users', path: '/users-admin', description: 'description.admin-menu.users'},
  {menu: 'menu.email', path: '/emails-admin', description: 'description.admin-menu.email'},
  {menu: 'menu.technologies', path: '/technologies-admin', description: 'description.admin-menu.technologies'},
  {menu: 'menu.links', path: '/links-admin', description: 'description.admin-menu.links'},
  {menu: 'menu.experiences', path: '/experiences-admin', description: 'description.admin-menu.experiences'},
  {menu: 'menu.projects', path: '/projects-admin', description: 'description.admin-menu.projects'},
  {menu: 'menu.book', path: '/books-admin', description: 'description.admin-menu.book'},
  {menu: 'menu.newsletter', path: '/newsletter-admin', description: 'description.admin-menu.newsletter'},
  {menu: 'menu.subscriber', path: '/subscriber-admin', description: 'description.admin-menu.subscriber'},
]

export const MEDIA_MENU = [
  {menu: 'menu.about-me-media', path: '/media-about-me', description: 'description.media-menu.about'},
  {menu: 'menu.media-books', path: '/media-books', description: 'description.media-menu.books'},
  {menu: 'menu.media-blogs', path: '/media-blogs', description: 'description.media-menu.blogs'},
  {menu: 'menu.media-projects', path: '/media-projects', description: 'description.media-menu.projects'},
  {menu: 'menu.media-angular', path: '/media-angular', description: 'description.media-menu.angular'},
  {menu: 'menu.media-vue', path: '/media-vue', description: 'description.media-menu.vue'},
  {menu: 'menu.media-typescript', path: '/media-typescript', description: 'description.media-menu.typescript'},
  {menu: 'menu.media-javascript', path: '/media-javascript', description: 'description.media-menu.javascript'},
  {menu: 'menu.media-python', path: '/media-python', description: 'description.media-menu.python'},
  {menu: 'menu.media-mongodb', path: '/media-mongodb', description: 'description.media-menu.mongodb'},
]

export const TECHNOLOGIES_ADMIN_MENU: {menu: string, path: string, description: string}[] = [
  {menu: 'menu.tech-angular', path: '/tech-all-angular', description: 'description.tech-menu.angular'},
  {menu: 'menu.tech-vue', path: '/tech-all-vue', description: 'description.tech-menu.vue'},
  {menu: 'menu.tech-python', path: '/tech-all-python', description: 'description.tech-menu.python'},
  {menu: 'menu.tech-javascript', path: '/tech-all-javascript', description: 'description.tech-menu.javascript'},
  {menu: 'menu.tech-typescript', path: '/tech-all-typescript', description: 'description.tech-menu.typescript'},
  {menu: 'menu.tech-mongodb', path: '/tech-all-mongodb', description: 'description.tech-menu.mongodb'},
]

export const TECHNOLOGIES_PUBLIC_MENU: {menu: string, path: string, description: string, img: string}[] = [
  {menu: 'menu.tech-angular', path: '/angular', description: 'description.tech-menu.angular', img: '/assets/media/technologies/angular.png'},
  {menu: 'menu.tech-vue', path: '/vue', description: 'description.tech-menu.vue', img: '/assets/media/technologies/vue.png'},
  {menu: 'menu.tech-python', path: '/python', description: 'description.tech-menu.python', img: '/assets/media/technologies/python.png'},
  {menu: 'menu.tech-javascript', path: '/javascript', description: 'description.tech-menu.javascript', img: '/assets/media/technologies/javascript.png'},
  {menu: 'menu.tech-typescript', path: '/typescript', description: 'description.tech-menu.typescript', img: '/assets/media/technologies/typescript.png'},
  {menu: 'menu.tech-mongodb', path: '/mongodb', description: 'description.tech-menu.mongodb', img: '/assets/media/technologies/mongodb.png'},
]
