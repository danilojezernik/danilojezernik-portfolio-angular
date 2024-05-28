import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogAllComponent} from "./core/pages/public/blog/blog-all/blog-all.component";
import {HomeComponent} from "./core/pages/public/home/home.component";
import {GithubComponent} from "./core/pages/public/github/github.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'blog',
    component: BlogAllComponent
  },
  {
    path: 'github',
    component: GithubComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
