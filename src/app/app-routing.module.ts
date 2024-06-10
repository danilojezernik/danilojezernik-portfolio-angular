import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogAllComponent } from "./core/pages/public/blog/blog-all/blog-all.component";
import { HomeComponent } from "./core/pages/public/home/home.component";
import { GithubComponent } from "./core/pages/public/github/github.component";
import { BiographyComponent } from "./core/pages/public/biography/biography.component";
import { ExperiencesComponent } from "./core/pages/public/experiences/experiences.component";
import { NotFoundComponent } from "./core/pages/public/not-found/not-found.component";
import { ProjectsComponent } from "./core/pages/public/projects/projects.component";
import { MediaComponent } from "./core/pages/public/media/media.component";
import { BookComponent } from "./core/pages/public/book/book.component";
import { LinksComponent } from "./core/pages/public/links/links.component";
import { ContactComponent } from "./core/pages/public/contact/contact.component";
import { BlogByIdComponent } from "./core/pages/public/blog/blog-by-id/blog-by-id.component";
import {
  BlogEditByIdAdminComponent
} from "./core/pages/private/blog/blog-edit-by-id-admin/blog-edit-by-id-admin.component";
import { BlogAllAdminComponent } from "./core/pages/private/blog/blog-all-admin/blog-all-admin.component";
import { LoginComponent } from "./core/pages/public/login/login.component";
import { AuthGuardService } from "./auth/auth-guard.service";
import { AdminComponent } from "./core/pages/private/admin/admin.component";
import { RegisterUserComponent } from "./core/pages/public/register-user/register-user.component";
import { UsersComponent } from "./core/pages/public/users/users-all/users.component";
import { BlogByIdAdminComponent } from "./core/pages/private/blog/blog-by-id-admin/blog-by-id-admin.component";
import { UsersAllAdminComponent } from "./core/pages/private/users-admin/users-all-admin/users-all-admin.component";
import { EmailsAdminComponent } from "./core/pages/private/emails-admin/emails-admin.component";
import { ExperiencesAdminComponent } from "./core/pages/private/experiences-admin/experiences-admin.component";
import { ProjectsAdminComponent } from "./core/pages/private/projects-admin/projects-admin.component";
import { AddBlogAdminComponent } from "./core/pages/private/blog/add-blog-admin/add-blog-admin.component";
import { UserByIdComponent } from "./core/pages/public/users/user-by-id/user-by-id.component";

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

  // PRIVATE
  {
    path: 'experiences-admin',
    component: ExperiencesAdminComponent,
    canActivate: [ AuthGuardService ]
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
    component: ProjectsAdminComponent,
    canActivate: [ AuthGuardService ]
  },

  // --------------------
  //     BLOG ROUTES
  // --------------------

  // PUBLIC
  {
    path: 'blog',
    component: BlogAllComponent
  },
  {
    path: 'blog/:id',
    component: BlogByIdComponent
  },

  // PRIVATE
  {
    path: 'blog-admin',
    component: BlogAllAdminComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'blog-admin/:id',
    component: BlogByIdAdminComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'blog-admin/edit/:id',
    component: BlogEditByIdAdminComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'add-blog-admin',
    component: AddBlogAdminComponent,
    canActivate: [ AuthGuardService ]
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
    component: MediaComponent
  },

  // ---------------------------
  //     BOOKS ROUTES
  // ---------------------------
  {
    path: 'books',
    component: BookComponent
  },

  // ---------------------------
  //     LINKS ROUTES
  // ---------------------------
  {
    path: 'links',
    component: LinksComponent
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
    canActivate: [ AuthGuardService ]
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
    canActivate: [ AuthGuardService ]
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
    canActivate: [ AuthGuardService ]
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
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
