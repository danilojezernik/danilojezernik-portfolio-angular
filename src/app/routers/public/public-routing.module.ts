import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../../core/pages/public/home/home.component";
import {BiographyComponent} from "../../core/pages/public/biography/biography.component";
import {ExperiencesComponent} from "../../core/pages/public/experiences/experiences.component";
import {ProjectsComponent} from "../../core/pages/public/projects/projects.component";
import {BookComponent} from "../../core/pages/public/book/book.component";
import {LinksComponent} from "../../core/pages/public/links/links.component";
import {ContactComponent} from "../../core/pages/public/contact/contact.component";
import {BlogAllComponent} from "../../core/pages/public/blog/blog-all/blog-all.component";
import {BlogByIdComponent} from "../../core/pages/public/blog/blog-by-id/blog-by-id.component";
import {LoginComponent} from "../../core/pages/public/login/login.component";
import {RegisterUserComponent} from "../../core/pages/public/register-user/register-user.component";
import {UsersComponent} from "../../core/pages/public/users/users-all/users.component";
import {UserByIdComponent} from "../../core/pages/public/users/user-by-id/user-by-id.component";
import {TechnologyAllComponent} from "../../core/pages/public/technology/technology-all/technology-all.component";
import {TechnologyByIdComponent} from "../../core/pages/public/technology/technology-by-id/technology-by-id.component";
import {GithubComponent} from "../../core/pages/public/github/github.component";
import {AboutComponent} from "../../core/pages/public/about/about.component";
import {NotAuthorizedComponent} from "../../core/pages/public/not-authorized/not-authorized.component";
import {NotFoundComponent} from "../../core/pages/public/not-found/not-found.component";

const publicRoutes: Routes = [
  { path: 'biography', component: BiographyComponent },
  { path: 'experiences', component: ExperiencesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'books', component: BookComponent },
  { path: 'links', component: LinksComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogAllComponent },
  { path: 'blog/:id', component: BlogByIdComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:id', component: UserByIdComponent },
  { path: 'technology', component: TechnologyAllComponent },
  { path: 'technology/:id', component: TechnologyByIdComponent },
  { path: 'github', component: GithubComponent },
  { path: 'about', component: AboutComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(publicRoutes) ],
  exports: [ RouterModule ]
})
export class PublicRoutingModule { }
