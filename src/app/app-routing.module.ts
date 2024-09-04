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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'biography',
    component: BiographyComponent
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

  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuardService]
  },

  // PRIVATE
  {
    path: 'experiences-admin',
    component: AllExperiencesAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-experiences-admin',
    component: AddExperiencesAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-experiences-admin/:id',
    component: EditExperiencesAdminComponent,
    canActivate: [AuthGuardService]
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
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-project-admin',
    component: ProjectAddAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-projects-admin/:id',
    component: ProjectEditAdminComponent,
    canActivate: [AuthGuardService]
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

  // PRIVATE
  {
    path: 'technologies-admin',
    component: TechnologiesAdminComponent,
    canActivate: [AuthGuardService]
  },
  // ANGULAR
  {
    path: 'tech-all-angular',
    component: AngularAllAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tech-add-angular',
    component: AngularAddAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tech-edit-angular/:id',
    component: AngularEditAdminComponent,
    canActivate: [AuthGuardService]
  },
  // VUE
  {
    path: 'tech-all-vue',
    component: VueAllAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tech-add-vue',
    component: VueAddAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tech-edit-vue/:id',
    component: VueEditAdminComponent,
    canActivate: [AuthGuardService]
  },
  // PYTHON
  {
    path: 'tech-all-python',
    component: PythonAllAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tech-add-python',
    component: PythonAddAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tech-edit-python/:id',
    component: PythonEditAdminComponent,
    canActivate: [AuthGuardService]
  },
  // JAVASCRIPT
  {
    path: 'tech-all-javascript',
    component: JavascriptAllAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tech-add-javascript',
    component: JavascriptAddAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tech-edit-javascript/:id',
    component: JavascriptEditAdminComponent,
    canActivate: [AuthGuardService]
  },
  // TYPESCRIPT
  {
    path: 'tech-all-typescript',
    component: TypescriptAllAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tech-add-typescript',
    component: TypescriptAddAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tech-edit-typescript/:id',
    component: TypescriptEditAdminComponent,
    canActivate: [AuthGuardService]
  },
  // MONGODB
  {
    path: 'tech-all-mongodb',
    component: MongodbAllAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tech-add-mongodb',
    component: MongodbAddAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tech-edit-mongodb/:id',
    component: MongodbEditAdminComponent,
    canActivate: [AuthGuardService]
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
    canActivate: [AuthGuardService]
  },
  {
    path: 'media-about-me',
    component: AboutMeMediaAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'media-books',
    component: BooksMediaAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'media-blogs',
    component: BlogsMediaAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'media-projects',
    component: ProjectsMediaAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'media-angular',
    component: AngularMediaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'media-vue',
    component: VueMediaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'media-python',
    component: PythonMediaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'media-mongodb',
    component: MongodbMediaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'media-javascript',
    component: JavascriptMediaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'media-typescript',
    component: TypescriptMediaComponent,
    canActivate: [AuthGuardService]
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
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-books-admin',
    component: AddBooksAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-books-admin/:id',
    component: EditBooksAdminComponent,
    canActivate: [AuthGuardService]
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
    component: EditCommentAdminComponent
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
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-links-admin',
    component: AddLinksComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-links-admin/:id',
    component: EditLinksComponent,
    canActivate: [AuthGuardService]
  },

  // ---------------------------
  //     NEWSLETTER ROUTES
  // ---------------------------

  // PRIVATE
  {
    path: 'newsletter-admin',
    component: AllNewsletterAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-newsletter-admin',
    component: AddNewsletterAdminComponent,
    canActivate: [AuthGuardService]
  },

  // ---------------------------
  //     SUBSCRIBER ROUTES
  // ---------------------------

  // PRIVATE
  {
    path: 'subscriber-admin',
    component: AllSubscriberAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-subscriber-admin',
    component: AddSubscriberAdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-subscriber-admin/:id',
    component: EditSubscriberAdminComponent,
    canActivate: [AuthGuardService]
  },

  // ---------------------------
  //     CONTACT ROUTES
  // ---------------------------
  {
    path: 'contact',
    component: ContactComponent
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
    path: 'not-authorized', component: NotAuthorizedComponent,
    canActivate: [AuthGuardService]
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
