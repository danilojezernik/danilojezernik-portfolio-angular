// Menu items for the header component
// MENU ITEMS FOR HEADER COMPONENT
export const MENU_TOP: { menu: string, path: string }[] = [
  {menu: 'menu.home', path: '/'},
  {menu: 'menu.about', path: '/about'},
  {menu: 'menu.blog', path: '/blog'},
  {menu: 'menu.github', path: '/github'},
  {menu: 'menu.dev', path: '/dev'},
  {menu: 'menu.stack', path: '/stack-data'},
  {menu: 'menu.books', path: '/books'},
  {menu: 'menu.users', path: '/users'},
  {menu: 'menu.technologies', path: '/technologies'},
  {menu: 'menu.register', path: '/register'},
  {menu: 'menu.contact', path: '/contact'},
  {menu: 'menu.dashboard', path: '/dashboard'}
]

// MENU ITEMS FOR LOGIN AND LOGOUT HEADER COMPONENT
export const LOGIN_LOGOUT: { menu: string, path: string, condition: string }[] = [
  {menu: 'menu.login', path: '/login', condition: 'loggedOut'},
  {menu: 'menu.logout', path: '/logout', condition: 'loggedIn'},
]

// LINK ITEMS FOR ABOUT ME PAGE COMPONENT
export const ABOUT_ME: { menu: string, path: string, description: string }[] = [
  {menu: 'menu.biography', path: '/biography', description: 'pages.my-data.biography'},
  {menu: 'menu.experiences', path: '/experiences', description: 'pages.experiences.description'},
  {menu: 'menu.projects', path: '/projects', description: 'pages.my-data.projects'},
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
  {menu: 'menu.language', path: '/language-admin', description: 'description.admin-menu.language'},
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

export const TECHNOLOGIES_ADMIN_MENU: { menu: string, path: string, description: string }[] = [
  {menu: 'menu.tech-angular', path: '/tech-all-angular', description: 'description.tech-menu.angular'},
  {menu: 'menu.tech-vue', path: '/tech-all-vue', description: 'description.tech-menu.vue'},
  {menu: 'menu.tech-python', path: '/tech-all-python', description: 'description.tech-menu.python'},
  {menu: 'menu.tech-javascript', path: '/tech-all-javascript', description: 'description.tech-menu.javascript'},
  {menu: 'menu.tech-typescript', path: '/tech-all-typescript', description: 'description.tech-menu.typescript'},
  {menu: 'menu.tech-mongodb', path: '/tech-all-mongodb', description: 'description.tech-menu.mongodb'},
]



export const TECH_DEV_API_MENU = [
  {menu: 'dev.angular', path: '/dev/angular', description: 'dev.angular-desc', img: '/assets/media/dev/angular.png'},
  {menu: 'dev.vue', path: '/dev/vue', description: 'dev.vue-desc', img: '/assets/media/dev/vue.png'},
  {menu: 'dev.mongodb', path: '/dev/mongodb', description: 'dev.mongodb-desc', img: '/assets/media/dev/mongodb.png'},
  {menu: 'dev.python', path: '/dev/python', description: 'dev.python-desc', img: '/assets/media/dev/python.png'},
  {menu: 'dev.javascript', path: '/dev/javascript', description: 'dev.javascript-desc', img: '/assets/media/dev/javascript.png'},
  {menu: 'dev.typescript', path: '/dev/typescript', description: 'dev.typescript-desc', img: '/assets/media/dev/typescript.png'},
  {menu: 'dev.css', path: '/dev/css', description: 'dev.css-desc', img: '/assets/media/dev/css.png'},
  {menu: 'dev.frontend', path: '/dev/frontend', description: 'dev.frontend-desc', img: '/assets/media/dev/frontend.png'},
  {menu: 'dev.backend', path: '/dev/backend', description: 'dev.backend-desc', img: '/assets/media/dev/backend.png'},
  {menu: 'dev.ai', path: '/dev/ai', description: 'dev.ai-desc', img: '/assets/media/dev/ai.png'},
  {menu: 'dev.github', path: '/dev/github', description: 'dev.github-desc', img: '/assets/media/dev/github.png'},
  {menu: 'dev.sql', path: '/dev/sql', description: 'dev.sql-desc', img: '/assets/media/dev/sql.png'},
  {menu: 'dev.cypress', path: '/dev/cypress', description: 'dev.cypress-desc', img: '/assets/media/dev/cypress.png'},
  {menu: 'dev.algorithms', path: '/dev/algorithms', description: 'dev.algorithms-desc', img: '/assets/media/dev/algorithms.png'},
]

export const TECHNOLOGIES_PUBLIC_MENU: { menu: string, path: string, description: string, img: string }[] = [
  {
    menu: 'menu.tech-angular',
    path: '/angular',
    description: 'description.tech-menu.angular',
    img: '/assets/media/technologies/angular.png'
  },
  {
    menu: 'menu.tech-vue',
    path: '/vue',
    description: 'description.tech-menu.vue',
    img: '/assets/media/technologies/vue.png'
  },
  {
    menu: 'menu.tech-python',
    path: '/python',
    description: 'description.tech-menu.python',
    img: '/assets/media/technologies/python.png'
  },
  {
    menu: 'menu.tech-javascript',
    path: '/javascript',
    description: 'description.tech-menu.javascript',
    img: '/assets/media/technologies/javascript.png'
  },
  {
    menu: 'menu.tech-typescript',
    path: '/typescript',
    description: 'description.tech-menu.typescript',
    img: '/assets/media/technologies/typescript.png'
  },
  {
    menu: 'menu.tech-mongodb',
    path: '/mongodb',
    description: 'description.tech-menu.mongodb',
    img: '/assets/media/technologies/mongodb.png'
  },
]
