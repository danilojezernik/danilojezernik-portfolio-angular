import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "../../core/pages/private/admin/admin.component";
import {AuthGuardService} from "../../auth/auth-guard.service";
import {BlogAllAdminComponent} from "../../core/pages/private/blog/blog-all-admin/blog-all-admin.component";
import {
  BlogEditByIdAdminComponent
} from "../../core/pages/private/blog/blog-edit-by-id-admin/blog-edit-by-id-admin.component";
import {AddBlogAdminComponent} from "../../core/pages/private/blog/add-blog-admin/add-blog-admin.component";
import {UsersAllAdminComponent} from "../../core/pages/private/users-admin/users-all-admin/users-all-admin.component";
import {UserAddAdminComponent} from "../../core/pages/private/users-admin/user-add-admin/user-add-admin.component";
import {
  UserEditByIdAdminComponent
} from "../../core/pages/private/users-admin/user-edit-by-id-admin/user-edit-by-id-admin.component";
import {
  ProjectsAllAdminComponent
} from "../../core/pages/private/projects-admin/projects-all-admin/projects-all-admin.component";
import {
  ProjectAddAdminComponent
} from "../../core/pages/private/projects-admin/project-add-admin/project-add-admin.component";
import {
  ProjectEditAdminComponent
} from "../../core/pages/private/projects-admin/project-edit-admin/project-edit-admin.component";
import {
  AllExperiencesAdminComponent
} from "../../core/pages/private/experiences-admin/all-experiences-admin/all-experiences-admin.component";
import {
  AddExperiencesAdminComponent
} from "../../core/pages/private/experiences-admin/add-experiences-admin/add-experiences-admin.component";
import {
  EditExperiencesAdminComponent
} from "../../core/pages/private/experiences-admin/edit-experiences-admin/edit-experiences-admin.component";
import {AllBooksAdminComponent} from "../../core/pages/private/book/all-books-admin/all-books-admin.component";
import {AddBooksAdminComponent} from "../../core/pages/private/book/add-books-admin/add-books-admin.component";
import {EditBooksAdminComponent} from "../../core/pages/private/book/edit-books-admin/edit-books-admin.component";
import {TechnologiesAdminComponent} from "../../core/pages/private/technologies/technologies-admin.component";
import {
  AngularAllAdminComponent
} from "../../core/pages/private/technologies/angular/angular-all-admin/angular-all-admin.component";
import {
  AngularAddAdminComponent
} from "../../core/pages/private/technologies/angular/angular-add-admin/angular-add-admin.component";
import {
  AngularEditAdminComponent
} from "../../core/pages/private/technologies/angular/angular-edit-admin/angular-edit-admin.component";
import {VueAllAdminComponent} from "../../core/pages/private/technologies/vue/vue-all-admin/vue-all-admin.component";
import {VueAddAdminComponent} from "../../core/pages/private/technologies/vue/vue-add-admin/vue-add-admin.component";
import {VueEditAdminComponent} from "../../core/pages/private/technologies/vue/vue-edit-admin/vue-edit-admin.component";
import {
  PythonAllAdminComponent
} from "../../core/pages/private/technologies/python/python-all-admin/python-all-admin.component";
import {
  PythonAddAdminComponent
} from "../../core/pages/private/technologies/python/python-add-admin/python-add-admin.component";
import {
  PythonEditAdminComponent
} from "../../core/pages/private/technologies/python/python-edit-admin/python-edit-admin.component";
import {
  JavascriptAllAdminComponent
} from "../../core/pages/private/technologies/javascript/javascript-all-admin/javascript-all-admin.component";
import {
  JavascriptAddAdminComponent
} from "../../core/pages/private/technologies/javascript/javascript-add-admin/javascript-add-admin.component";
import {
  JavascriptEditAdminComponent
} from "../../core/pages/private/technologies/javascript/javascript-edit-admin/javascript-edit-admin.component";
import {
  TypescriptAllAdminComponent
} from "../../core/pages/private/technologies/typescript/typescript-all-admin/typescript-all-admin.component";
import {
  TypescriptAddAdminComponent
} from "../../core/pages/private/technologies/typescript/typescript-add-admin/typescript-add-admin.component";
import {
  TypescriptEditAdminComponent
} from "../../core/pages/private/technologies/typescript/typescript-edit-admin/typescript-edit-admin.component";
import {
  MongodbAllAdminComponent
} from "../../core/pages/private/technologies/mongodb/mongodb-all-admin/mongodb-all-admin.component";
import {
  MongodbAddAdminComponent
} from "../../core/pages/private/technologies/mongodb/mongodb-add-admin/mongodb-add-admin.component";
import {
  MongodbEditAdminComponent
} from "../../core/pages/private/technologies/mongodb/mongodb-edit-admin/mongodb-edit-admin.component";
import {MediaAdminComponent} from "../../core/pages/private/media/media-admin.component";
import {AboutMeMediaAdminComponent} from "../../core/pages/private/media/about-me-media/about-me-media-admin.component";
import {BooksMediaAdminComponent} from "../../core/pages/private/media/books-media/books-media-admin.component";
import {BlogsMediaAdminComponent} from "../../core/pages/private/media/blogs-media/blogs-media-admin.component";
import {ProjectsMediaAdminComponent} from "../../core/pages/private/media/projects-media/projects-media-admin.component";
import {
  CommentsAllAdminComponent
} from "../../core/pages/private/comments-admin/comments-all-admin/comments-all-admin.component";
import {
  EditCommentAdminComponent
} from "../../core/pages/private/comments-admin/edit-comment-admin/edit-comment-admin.component";
import {AllLinksComponent} from "../../core/pages/private/links/all-links/all-links.component";
import {AddLinksComponent} from "../../core/pages/private/links/add-links/add-links.component";
import {EditLinksComponent} from "../../core/pages/private/links/edit-links/edit-links.component";
import {EmailsAdminComponent} from "../../core/pages/private/emails-admin/emails-admin.component";
import {AllTechnologyComponent} from "../../core/pages/private/technology/all-technology/all-technology.component";
import {EditTechnologyComponent} from "../../core/pages/private/technology/edit-technology/edit-technology.component";
import {AddTechnologyComponent} from "../../core/pages/private/technology/add-technology/add-technology.component";
import {
  AllNewsletterAdminComponent
} from "../../core/pages/private/newsletter/all-newsletter-admin/all-newsletter-admin.component";
import {
  AddNewsletterAdminComponent
} from "../../core/pages/private/newsletter/add-newsletter-admin/add-newsletter-admin.component";
import {
  AllSubscriberAdminComponent
} from "../../core/pages/private/subscriber/all-subscriber-admin/all-subscriber-admin.component";
import {
  AddSubscriberAdminComponent
} from "../../core/pages/private/subscriber/add-subscriber-admin/add-subscriber-admin.component";
import {
  EditSubscriberAdminComponent
} from "../../core/pages/private/subscriber/edit-subscriber-admin/edit-subscriber-admin.component";
import {NotAuthorizedComponent} from "../../core/pages/public/not-authorized/not-authorized.component";
import {NotFoundComponent} from "../../core/pages/public/not-found/not-found.component";

const adminRoutes: Routes = [

  {
    path: '',
    component: AdminComponent,
  },
      { path: 'blogs', component: BlogAllAdminComponent },
      { path: 'blogs/edit/:id', component: BlogEditByIdAdminComponent },
      { path: 'blogs/add', component: AddBlogAdminComponent },
      { path: 'users', component: UsersAllAdminComponent },
      { path: 'users/add', component: UserAddAdminComponent },
      { path: 'users/edit/:id', component: UserEditByIdAdminComponent },
      { path: 'projects', component: ProjectsAllAdminComponent },
      { path: 'projects/add', component: ProjectAddAdminComponent },
      { path: 'projects/edit/:id', component: ProjectEditAdminComponent },
      { path: 'experiences', component: AllExperiencesAdminComponent },
      { path: 'experiences/add', component: AddExperiencesAdminComponent },
      { path: 'experiences/edit/:id', component: EditExperiencesAdminComponent },
      { path: 'books', component: AllBooksAdminComponent },
      { path: 'books/add', component: AddBooksAdminComponent },
      { path: 'books/edit/:id', component: EditBooksAdminComponent },
      { path: 'technologies', component: TechnologiesAdminComponent },
      { path: 'technologies/angular', component: AngularAllAdminComponent },
      { path: 'technologies/angular/add', component: AngularAddAdminComponent },
      { path: 'technologies/angular/edit/:id', component: AngularEditAdminComponent },
      { path: 'technologies/vue', component: VueAllAdminComponent },
      { path: 'technologies/vue/add', component: VueAddAdminComponent },
      { path: 'technologies/vue/edit/:id', component: VueEditAdminComponent },
      { path: 'technologies/python', component: PythonAllAdminComponent },
      { path: 'technologies/python/add', component: PythonAddAdminComponent },
      { path: 'technologies/python/edit/:id', component: PythonEditAdminComponent },
      { path: 'technologies/javascript', component: JavascriptAllAdminComponent },
      { path: 'technologies/javascript/add', component: JavascriptAddAdminComponent },
      { path: 'technologies/javascript/edit/:id', component: JavascriptEditAdminComponent },
      { path: 'technologies/typescript', component: TypescriptAllAdminComponent },
      { path: 'technologies/typescript/add', component: TypescriptAddAdminComponent },
      { path: 'technologies/typescript/edit/:id', component: TypescriptEditAdminComponent },
      { path: 'technologies/mongodb', component: MongodbAllAdminComponent },
      { path: 'technologies/mongodb/add', component: MongodbAddAdminComponent },
      { path: 'technologies/mongodb/edit/:id', component: MongodbEditAdminComponent },
      { path: 'media', component: MediaAdminComponent },
      { path: 'media/about-me', component: AboutMeMediaAdminComponent },
      { path: 'media/books', component: BooksMediaAdminComponent },
      { path: 'media/blogs', component: BlogsMediaAdminComponent },
      { path: 'media/projects', component: ProjectsMediaAdminComponent },
      { path: 'comments', component: CommentsAllAdminComponent },
      { path: 'comments/edit/:id', component: EditCommentAdminComponent },
      { path: 'links', component: AllLinksComponent },
      { path: 'links/add', component: AddLinksComponent },
      { path: 'links/edit/:id', component: EditLinksComponent },
      { path: 'emails', component: EmailsAdminComponent },
      { path: 'technology', component: AllTechnologyComponent },
      { path: 'technology/edit/:id', component: EditTechnologyComponent },
      { path: 'technology/add', component: AddTechnologyComponent },
      { path: 'newsletter', component: AllNewsletterAdminComponent },
      { path: 'newsletter/add', component: AddNewsletterAdminComponent },
      { path: 'subscribers', component: AllSubscriberAdminComponent },
      { path: 'subscribers/add', component: AddSubscriberAdminComponent },
      { path: 'subscribers/edit/:id', component: EditSubscriberAdminComponent },
      { path: 'not-authorized', component: NotAuthorizedComponent },
      { path: '**', component: NotFoundComponent }


];


@NgModule({
  imports: [ RouterModule.forChild(adminRoutes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
