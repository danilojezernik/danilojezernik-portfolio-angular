import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogService} from "../../../../../services/api/blog/blog.service";

@Component({
  selector: 'app-blog-all',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-all.component.html',
  styleUrls: ['./blog-all.component.scss']
})
export class BlogAllComponent {

  _blogService = inject(BlogService)

  blog$ = this._blogService.getAllBlogs()
}
