import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogAllComponent } from "./core/pages/public/blog/blog-all/blog-all.component";
import { HomeComponent } from "./core/pages/public/home/home.component";
import { GithubComponent } from "./core/pages/public/github/github.component";
import { BiographyComponent } from "./core/pages/public/biography/biography.component";
import { ExperiencesComponent } from "./core/pages/public/experiences/experiences.component";
import { NotFoundComponent } from "./core/pages/public/not-found/not-found.component";

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
    path: 'blog',
    component: BlogAllComponent
  },
  {
    path: 'github',
    component: GithubComponent
  },
  {
    path: 'github',
    component: GithubComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Hypnosis studio Alen - Stran ne obstaja ali ni najdena',
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
