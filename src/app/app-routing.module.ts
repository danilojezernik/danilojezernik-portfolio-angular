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
import { SysInfoComponent } from "./core/pages/public/sys-info/sys-info.component";

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
    path: 'experiences',
    component: ExperiencesComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'blog',
    component: BlogAllComponent
  },
  {
    path: 'blog-admin',
    component: BlogAllAdminComponent
  },
  {
    path: 'blog/:id',
    component: BlogByIdComponent
  },
  {
    path: 'blog-admin/edit/:id',
    component: BlogEditByIdAdminComponent
  },
  {
    path: 'github',
    component: GithubComponent
  },
  {
    path: 'media',
    component: MediaComponent
  },
  {
    path: 'books',
    component: BookComponent
  },
  {
    path: 'links',
    component: LinksComponent
  },
  {
    path: 'sys',
    component: SysInfoComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
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
