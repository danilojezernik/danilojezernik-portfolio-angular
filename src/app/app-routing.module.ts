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
import { UsersComponent } from "./core/pages/public/users/users.component";

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
  {
    path: 'experiences',
    component: ExperiencesComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
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
    path: 'blog-admin/edit/:id',
    component: BlogEditByIdAdminComponent,
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
  //     USERS ROUTES
  // ---------------------------

  {
    path: 'users',
    component: UsersComponent
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
