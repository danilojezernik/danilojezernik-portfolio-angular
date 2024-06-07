import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from "../../../../../services/api/blog.service";
import { RouterLink } from "@angular/router";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-blog-all-admin',
  standalone: true,
  imports: [ CommonModule, RouterLink, GoBackComponent ],
  templateUrl: './blog-all-admin.component.html'
})
export class BlogAllAdminComponent {

  _blogService = inject(BlogService)

  blogs$ = this._blogService.getAllBlogsAdmin()

}
