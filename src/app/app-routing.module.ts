import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogAllComponent} from "./core/pages/public/blog/blog-all/blog-all.component";
import {HomeComponent} from "./core/pages/public/home/home.component";
import {GithubComponent} from "./core/pages/public/github/github.component";
import {BiographyComponent} from "./core/pages/public/biography/biography.component";
import {ExperiencesComponent} from "./core/pages/public/experiences/experiences.component";
import {NotFoundComponent} from "./core/pages/public/not-found/not-found.component";
import {ProjectsComponent} from "./core/pages/public/projects/projects.component";
import {BookComponent} from "./core/pages/public/book/book.component";
import {LinksComponent} from "./core/pages/public/links/links.component";
import {ContactComponent} from "./core/pages/public/contact/contact.component";
import {BlogByIdComponent} from "./core/pages/public/blog/blog-by-id/blog-by-id.component";
import {
  BlogEditByIdAdminComponent
} from "./core/pages/private/blog/blog-edit-by-id-admin/blog-edit-by-id-admin.component";
import {BlogAllAdminComponent} from "./core/pages/private/blog/blog-all-admin/blog-all-admin.component";
import {LoginComponent} from "./core/pages/public/login/login.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {AdminComponent} from "./core/pages/private/admin/admin.component";
import {RegisterUserComponent} from "./core/pages/public/register-user/register-user.component";
import {UsersComponent} from "./core/pages/public/users/users-all/users.component";
import {UsersAllAdminComponent} from "./core/pages/private/users-admin/users-all-admin/users-all-admin.component";
import {EmailsAdminComponent} from "./core/pages/private/emails-admin/emails-admin.component";
import {
  AllExperiencesAdminComponent
} from "./core/pages/private/experiences-admin/all-experiences-admin/all-experiences-admin.component";
import {
  ProjectsAllAdminComponent
} from "./core/pages/private/projects-admin/projects-all-admin/projects-all-admin.component";
import {AddBlogAdminComponent} from "./core/pages/private/blog/add-blog-admin/add-blog-admin.component";
import {UserByIdComponent} from "./core/pages/public/users/user-by-id/user-by-id.component";
import {
  UserEditByIdAdminComponent
} from "./core/pages/private/users-admin/user-edit-by-id-admin/user-edit-by-id-admin.component";
import {
  ProjectEditAdminComponent
} from "./core/pages/private/projects-admin/project-edit-admin/project-edit-admin.component";
import {UserAddAdminComponent} from "./core/pages/private/users-admin/user-add-admin/user-add-admin.component";
import {
  ProjectAddAdminComponent
} from "./core/pages/private/projects-admin/project-add-admin/project-add-admin.component";
import {AllLinksComponent} from "./core/pages/private/links/all-links/all-links.component";
import {AddLinksComponent} from "./core/pages/private/links/add-links/add-links.component";
import {EditLinksComponent} from "./core/pages/private/links/edit-links/edit-links.component";
import {
  AddExperiencesAdminComponent
} from "./core/pages/private/experiences-admin/add-experiences-admin/add-experiences-admin.component";
import {
  EditExperiencesAdminComponent
} from "./core/pages/private/experiences-admin/edit-experiences-admin/edit-experiences-admin.component";
import {AllBooksAdminComponent} from "./core/pages/private/book/all-books-admin/all-books-admin.component";
import {AddBooksAdminComponent} from "./core/pages/private/book/add-books-admin/add-books-admin.component";
import {EditBooksAdminComponent} from "./core/pages/private/book/edit-books-admin/edit-books-admin.component";
import {
  AllNewsletterAdminComponent
} from "./core/pages/private/newsletter/all-newsletter-admin/all-newsletter-admin.component";
import {
  AddNewsletterAdminComponent
} from "./core/pages/private/newsletter/add-newsletter-admin/add-newsletter-admin.component";
import {
  AllSubscriberAdminComponent
} from "./core/pages/private/subscriber/all-subscriber-admin/all-subscriber-admin.component";
import {
  AddSubscriberAdminComponent
} from "./core/pages/private/subscriber/add-subscriber-admin/add-subscriber-admin.component";
import {
  EditSubscriberAdminComponent
} from "./core/pages/private/subscriber/edit-subscriber-admin/edit-subscriber-admin.component";
import {AboutComponent} from "./core/pages/public/about/about.component";
import {AboutMeMediaAdminComponent} from "./core/pages/private/media/about-me-media/about-me-media-admin.component";
import {MediaAdminComponent} from "./core/pages/private/media/media-admin.component";
import {BooksMediaAdminComponent} from "./core/pages/private/media/books-media/books-media-admin.component";
import {BlogsMediaAdminComponent} from "./core/pages/private/media/blogs-media/blogs-media-admin.component";
import {ProjectsMediaAdminComponent} from "./core/pages/private/media/projects-media/projects-media-admin.component";
import {NotAuthorizedComponent} from "./core/pages/public/not-authorized/not-authorized.component";
import {
  CommentsAllAdminComponent
} from "./core/pages/private/comments-admin/comments-all-admin/comments-all-admin.component";
import {
  EditCommentAdminComponent
} from "./core/pages/private/comments-admin/edit-comment-admin/edit-comment-admin.component";
import {TechnologiesAdminComponent} from "./core/pages/private/technologies/technologies-admin.component";
import {
  AngularAllAdminComponent
} from "./core/pages/private/technologies/angular/angular-all-admin/angular-all-admin.component";
import {
  AngularAddAdminComponent
} from "./core/pages/private/technologies/angular/angular-add-admin/angular-add-admin.component";
import {
  AngularEditAdminComponent
} from "./core/pages/private/technologies/angular/angular-edit-admin/angular-edit-admin.component";
import {VueAllAdminComponent} from "./core/pages/private/technologies/vue/vue-all-admin/vue-all-admin.component";
import {VueAddAdminComponent} from "./core/pages/private/technologies/vue/vue-add-admin/vue-add-admin.component";
import {VueEditAdminComponent} from "./core/pages/private/technologies/vue/vue-edit-admin/vue-edit-admin.component";
import {
  PythonAllAdminComponent
} from "./core/pages/private/technologies/python/python-all-admin/python-all-admin.component";
import {
  PythonAddAdminComponent
} from "./core/pages/private/technologies/python/python-add-admin/python-add-admin.component";
import {
  PythonEditAdminComponent
} from "./core/pages/private/technologies/python/python-edit-admin/python-edit-admin.component";
import {
  JavascriptAllAdminComponent
} from "./core/pages/private/technologies/javascript/javascript-all-admin/javascript-all-admin.component";
import {
  JavascriptAddAdminComponent
} from "./core/pages/private/technologies/javascript/javascript-add-admin/javascript-add-admin.component";
import {
  JavascriptEditAdminComponent
} from "./core/pages/private/technologies/javascript/javascript-edit-admin/javascript-edit-admin.component";
import {
  TypescriptAllAdminComponent
} from "./core/pages/private/technologies/typescript/typescript-all-admin/typescript-all-admin.component";
import {
  TypescriptAddAdminComponent
} from "./core/pages/private/technologies/typescript/typescript-add-admin/typescript-add-admin.component";
import {
  TypescriptEditAdminComponent
} from "./core/pages/private/technologies/typescript/typescript-edit-admin/typescript-edit-admin.component";
import {
  MongodbAllAdminComponent
} from "./core/pages/private/technologies/mongodb/mongodb-all-admin/mongodb-all-admin.component";
import {
  MongodbAddAdminComponent
} from "./core/pages/private/technologies/mongodb/mongodb-add-admin/mongodb-add-admin.component";
import {
  MongodbEditAdminComponent
} from "./core/pages/private/technologies/mongodb/mongodb-edit-admin/mongodb-edit-admin.component";
import {TechnologiesComponent} from "./core/pages/public/technologies/technologies.component";
import {AngularComponent} from "./core/pages/public/technologies/angular/angular.component";
import {VueComponent} from "./core/pages/public/technologies/vue/vue.component";
import {PythonComponent} from "./core/pages/public/technologies/python/python.component";
import {JavascriptComponent} from "./core/pages/public/technologies/javascript/javascript.component";
import {TypescriptComponent} from "./core/pages/public/technologies/typescript/typescript.component";
import {MongodbComponent} from "./core/pages/public/technologies/mongodb/mongodb.component";
import {AngularMediaComponent} from "./core/pages/private/media/angular-media/angular-media.component";
import {VueMediaComponent} from "./core/pages/private/media/vue-media/vue-media.component";
import {PythonMediaComponent} from "./core/pages/private/media/python-media/python-media.component";
import {MongodbMediaComponent} from "./core/pages/private/media/mongodb-media/mongodb-media.component";
import {JavascriptMediaComponent} from "./core/pages/private/media/javascript-media/javascript-media.component";
import {TypescriptMediaComponent} from "./core/pages/private/media/typescript-media/typescript-media.component";
import {UserDashboardComponent} from "./core/pages/private/users-admin/user-dashboard/user-dashboard.component";
import {ChatRoomComponent} from "./core/pages/public/chat-room/chat-room.component";
import {LanguageDataComponent} from "./core/pages/private/language-data/language-data.component";
import {DevAngularComponent} from "./core/pages/public/dev-news/dev-angular/dev-angular.component";
import {DevVueComponent} from "./core/pages/public/dev-news/dev-vue/dev-vue.component";
import {DevPythonComponent} from "./core/pages/public/dev-news/dev-python/dev-python.component";
import {DevJavascriptComponent} from "./core/pages/public/dev-news/dev-javascript/dev-javascript.component";
import {DevTypescriptComponent} from "./core/pages/public/dev-news/dev-typescript/dev-typescript.component";
import {DevMongodbComponent} from "./core/pages/public/dev-news/dev-mongodb/dev-mongodb.component";
import {DevCssComponent} from "./core/pages/public/dev-news/dev-css/dev-css.component";
import {DevFrontendComponent} from "./core/pages/public/dev-news/dev-frontend/dev-frontend.component";
import {DevBackendComponent} from "./core/pages/public/dev-news/dev-backend/dev-backend.component";
import {DevAiComponent} from "./core/pages/public/dev-news/dev-ai/dev-ai.component";
import {DevGithubComponent} from "./core/pages/public/dev-news/dev-github/dev-github.component";
import {DevSqlComponent} from "./core/pages/public/dev-news/dev-sql/dev-sql.component";
import {DevCypressComponent} from "./core/pages/public/dev-news/dev-cypress/dev-cypress.component";
import {DevAlgorithmsComponent} from "./core/pages/public/dev-news/dev-algorithms/dev-algorithms.component";
import {DevNewsComponent} from "./core/pages/public/dev-news/dev-news.component";
import {StackDataComponent} from "./core/pages/public/stack-data/stack-data.component";
import {DocumentationComponent} from "./core/pages/public/documentation/documentation.component";
import {LearningPathComponent} from "./core/pages/public/learning-path/learning-path.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'biography',
    component: BiographyComponent
  },
  {
    path: 'learning',
    component: LearningPathComponent
  },

  // ---------------------------
  //     EXPERIENCES ROUTES
  // ---------------------------

  // PUBLIC
  {
    path: 'experiences',
    component: ExperiencesComponent
  },

  // ---------------------------
  //     EXPERIENCES ROUTES
  // ---------------------------

  // PUBLIC

  {
    path: 'about',
    component: AboutComponent
  },

  // PRIVATE
  {
    path: 'experiences-admin',
    component: AllExperiencesAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'add-experiences-admin',
    component: AddExperiencesAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'edit-experiences-admin/:id',
    component: EditExperiencesAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },

  // ---------------------------
  //     PROJECTS ROUTES
  // ---------------------------

  // PUBLIC
  {
    path: 'projects',
    component: ProjectsComponent
  },

  // PRIVATE
  {
    path: 'projects-admin',
    component: ProjectsAllAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'add-project-admin',
    component: ProjectAddAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'edit-projects-admin/:id',
    component: ProjectEditAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },

  // --------------------
  //     BLOG ROUTES
  // --------------------

  // PUBLIC
  {
    path: 'blog',
    children: [
      {
        path: '',
        component: BlogAllComponent
      },
      {
        path: ':id',
        component: BlogByIdComponent
      }
    ]
  },


  // PRIVATE
  {
    path: 'blog-admin',
    data: {roles: ['admin']},
    children: [
      {
        path: '',
        component: BlogAllAdminComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'edit/:id',
        component: BlogEditByIdAdminComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'add',
        component: AddBlogAdminComponent,
        canActivate: [AuthGuardService]
      }
    ]

  },

  // --------------------
  //    WEBSOCKET CHAT ROOM ROUTES
  // --------------------

  {
    path: 'chat-room',
    component: ChatRoomComponent,
    canActivate: [AuthGuardService]

  },

  // --------------------
  //    TECHNOLOGIES ROUTES
  // --------------------

  // PUBLIC
  {
    path: 'technologies',
    children: [
      {
        path: '',
        component: TechnologiesComponent,
      },
      {
        path: 'angular',
        component: AngularComponent,
      },
      {
        path: 'vue',
        component: VueComponent,
      },
      {
        path: 'python',
        component: PythonComponent,
      },
      {
        path: 'javascript',
        component: JavascriptComponent,
      },
      {
        path: 'typescript',
        component: TypescriptComponent,
      },
      {
        path: 'mongodb',
        component: MongodbComponent,
      }
    ]
  },

  {
    path: 'documentation',
    component: DocumentationComponent
  },

  // PRIVATE
  {
    path: 'technologies-admin',
    component: TechnologiesAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  // ANGULAR
  {
    path: 'tech-all-angular',
    component: AngularAllAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'tech-add-angular',
    component: AngularAddAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'tech-edit-angular/:id',
    component: AngularEditAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  // VUE
  {
    path: 'tech-all-vue',
    component: VueAllAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'tech-add-vue',
    component: VueAddAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'tech-edit-vue/:id',
    component: VueEditAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  // PYTHON
  {
    path: 'tech-all-python',
    component: PythonAllAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'tech-add-python',
    component: PythonAddAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'tech-edit-python/:id',
    component: PythonEditAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  // JAVASCRIPT
  {
    path: 'tech-all-javascript',
    component: JavascriptAllAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'tech-add-javascript',
    component: JavascriptAddAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'tech-edit-javascript/:id',
    component: JavascriptEditAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  // TYPESCRIPT
  {
    path: 'tech-all-typescript',
    component: TypescriptAllAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'tech-add-typescript',
    component: TypescriptAddAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'tech-edit-typescript/:id',
    component: TypescriptEditAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  // MONGODB
  {
    path: 'tech-all-mongodb',
    component: MongodbAllAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'tech-add-mongodb',
    component: MongodbAddAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'tech-edit-mongodb/:id',
    component: MongodbEditAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },

  // ---------------------------
  //     GITHUB ROUTE
  // ---------------------------
  {
    path: 'github',
    component: GithubComponent
  },

  // ---------------------------
  //     MEDIA ROUTES
  // ---------------------------
  {
    path: 'media',
    component: MediaAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'media-about-me',
    component: AboutMeMediaAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'media-books',
    component: BooksMediaAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'media-blogs',
    component: BlogsMediaAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'media-projects',
    component: ProjectsMediaAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'media-angular',
    component: AngularMediaComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'media-vue',
    component: VueMediaComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'media-python',
    component: PythonMediaComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'media-mongodb',
    component: MongodbMediaComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'media-javascript',
    component: JavascriptMediaComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'media-typescript',
    component: TypescriptMediaComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },

  // ---------------------------
  //     BOOKS ROUTES
  // ---------------------------

  // PUBLIC
  {
    path: 'books',
    component: BookComponent
  },

  // PRIVATE
  {
    path: 'books-admin',
    component: AllBooksAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'add-books-admin',
    component: AddBooksAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'edit-books-admin/:id',
    component: EditBooksAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },

  // ---------------------------
  //     COMMENT ROUTES
  // ---------------------------

  // PUBLIC


  // PRIVATE

  {
    path: 'comments-admin',
    component: CommentsAllAdminComponent
  },
  {
    path: 'edit-comments-admin/:id',
    component: EditCommentAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}

  },

  // ---------------------------
  //     LINKS ROUTES
  // ---------------------------

  // PUBLIC
  {
    path: 'links',
    component: LinksComponent
  },

  // PRIVATE
  {
    path: 'links-admin',
    component: AllLinksComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'add-links-admin',
    component: AddLinksComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'edit-links-admin/:id',
    component: EditLinksComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },

  // ---------------------------
  //     NEWSLETTER ROUTES
  // ---------------------------

  // PRIVATE
  {
    path: 'newsletter-admin',
    component: AllNewsletterAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'add-newsletter-admin',
    component: AddNewsletterAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },

  // ---------------------------
  //     SUBSCRIBER ROUTES
  // ---------------------------

  // PRIVATE
  {
    path: 'subscriber-admin',
    component: AllSubscriberAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'add-subscriber-admin',
    component: AddSubscriberAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'edit-subscriber-admin/:id',
    component: EditSubscriberAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },

  // ---------------------------
  //     CONTACT ROUTES
  // ---------------------------
  {
    path: 'contact',
    component: ContactComponent
  },

  // ---------------------------
  //     DEV ROUTES
  // ---------------------------
  // PUBLIC
  {
    path: 'dev',
    children: [
      {
        path: '',
        component: DevNewsComponent,
      },
      {
        path: 'angular',
        component: DevAngularComponent,
      },
      {
        path: 'vue',
        component: DevVueComponent,
      },
      {
        path: 'python',
        component: DevPythonComponent,
      },
      {
        path: 'javascript',
        component: DevJavascriptComponent,
      },
      {
        path: 'typescript',
        component: DevTypescriptComponent,
      },
      {
        path: 'mongodb',
        component: DevMongodbComponent,
      },
      {
        path: 'css',
        component: DevCssComponent,
      },
      {
        path: 'frontend',
        component: DevFrontendComponent,
      },
      {
        path: 'backend',
        component: DevBackendComponent,
      },
      {
        path: 'ai',
        component: DevAiComponent,
      },
      {
        path: 'github',
        component: DevGithubComponent,
      },
      {
        path: 'sql',
        component: DevSqlComponent,
      },
      {
        path: 'cypress',
        component: DevCypressComponent,
      },
      {
        path: 'algorithms',
        component: DevAlgorithmsComponent,
      }
    ]
  },


  // ---------------------------
  //     LANGUAGE ROUTES
  // ---------------------------

  // PRIVATE

  {
    path: 'language-admin',
    component: LanguageDataComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },

  // PUBLIC

  {
    path: 'stack-data',
    component: StackDataComponent,
  },

  // ---------------------------
  //     LOGIN ROUTES
  // ---------------------------
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuardService]
  },
  // ---------------------------
  //     REGISTER ROUTES
  // ---------------------------
  {
    path: 'register',
    component: RegisterUserComponent
  },

  // ---------------------------
  //     EMAILS ROUTES
  // ---------------------------
  {
    path: 'emails-admin',
    component: EmailsAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },

  // ---------------------------
  //     USERS ROUTES
  // ---------------------------

  // PUBLIC
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'user/:id',
    component: UserByIdComponent
  },

  // PRIVATE
  {
    path: 'users-admin',
    component: UsersAllAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'add-user-admin',
    component: UserAddAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },
  {
    path: 'edit-user-admin/:id',
    component: UserEditByIdAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['admin']}
  },

  // ---------------------------
  //     NOT AUTHORIZED if not admin
  // ---------------------------
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  },

  // ---------------------------
  //     404 ROUTE
  // ---------------------------
  {
    path: '**',
    component: NotFoundComponent,
    title: 'DaniloJezernik.com - Page does not exist',
    data: {
      shouldRedirect: true
    }
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
