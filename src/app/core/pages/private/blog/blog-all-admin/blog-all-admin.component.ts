import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from "../../../../../services/api/blog.service";

@Component({
  selector: 'app-blog-all-admin',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './blog-all-admin.component.html'
})
export class BlogAllAdminComponent {

  _blogService = inject(BlogService)

}
