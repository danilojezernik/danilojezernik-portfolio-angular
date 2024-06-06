import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from "../../../../../services/api/blog.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-blog-all',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './blog-all.component.html'
})
export class BlogAllComponent {

  _blogService = inject(BlogService)

  blog$ = this._blogService.getAllBlogs()
}
