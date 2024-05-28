import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogAllComponent} from "./core/pages/public/blog/blog-all/blog-all.component";
import {HomeComponent} from "./core/pages/public/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'blog',
    component: BlogAllComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
