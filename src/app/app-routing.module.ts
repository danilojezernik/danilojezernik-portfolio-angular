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
import { UsersAllAdminComponent } from "./core/pages/private/users-admin/users-all-admin/users-all-admin.component";
import { EmailsAdminComponent } from "./core/pages/private/emails-admin/emails-admin.component";
import {
  AllExperiencesAdminComponent
} from "./core/pages/private/experiences-admin/all-experiences-admin/all-experiences-admin.component";
import {
  ProjectsAllAdminComponent
} from "./core/pages/private/projects-admin/projects-all-admin/projects-all-admin.component";
import { AddBlogAdminComponent } from "./core/pages/private/blog/add-blog-admin/add-blog-admin.component";
import { UserByIdComponent } from "./core/pages/public/users/user-by-id/user-by-id.component";
import {
  UserEditByIdAdminComponent
} from "./core/pages/private/users-admin/user-edit-by-id-admin/user-edit-by-id-admin.component";
import {
  ProjectEditAdminComponent
} from "./core/pages/private/projects-admin/project-edit-admin/project-edit-admin.component";
import { UserAddAdminComponent } from "./core/pages/private/users-admin/user-add-admin/user-add-admin.component";
import {
  ProjectAddAdminComponent
} from "./core/pages/private/projects-admin/project-add-admin/project-add-admin.component";
import { TechnologyAllComponent } from "./core/pages/public/technology/technology-all/technology-all.component";
import { TechnologyByIdComponent } from "./core/pages/public/technology/technology-by-id/technology-by-id.component";
import {
  AllTechnologyComponent
} from "./core/pages/private/technology/all-technology/all-technology.component";
import {
  EditTechnologyComponent
} from "./core/pages/private/technology/edit-technology/edit-technology.component";
import {
  AddTechnologyComponent
} from "./core/pages/private/technology/add-technology/add-technology.component";
import { AllLinksComponent } from "./core/pages/private/links/all-links/all-links.component";
import { AddLinksComponent } from "./core/pages/private/links/add-links/add-links.component";
import { EditLinksComponent } from "./core/pages/private/links/edit-links/edit-links.component";

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
    component: AllExperiencesAdminComponent,
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
    component: ProjectsAllAdminComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'add-project-admin',
    component: ProjectAddAdminComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'projects-admin/edit/:id',
    component: ProjectEditAdminComponent,
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
    path: 'blog-admin/edit/:id',
    component: BlogEditByIdAdminComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'add-blog-admin',
    component: AddBlogAdminComponent,
    canActivate: [ AuthGuardService ]
  },

  // --------------------
  //     TECHNOLOGY ROUTES
  // --------------------

  // PUBLIC
  {
    path: 'technology',
    component: TechnologyAllComponent
  },
  {
    path: 'technology/:id',
    component: TechnologyByIdComponent
  },

  // PRIVATE
  {
    path: 'technology-admin',
    component: AllTechnologyComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'technology-admin/edit/:id',
    component: EditTechnologyComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'add-technology-admin',
    component: AddTechnologyComponent,
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

  // PUBLIC
  {
    path: 'links',
    component: LinksComponent
  },

  // PRIVATE
  {
    path: 'links-admin',
    component: AllLinksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'links-admin/add',
    component: AddLinksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'links-admin/edit/:id',
    component: EditLinksComponent,
    canActivate: [ AuthGuardService ]
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
  {
    path: 'user-admin/add',
    component: UserAddAdminComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'user-admin/edit/:id',
    component: UserEditByIdAdminComponent,
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
