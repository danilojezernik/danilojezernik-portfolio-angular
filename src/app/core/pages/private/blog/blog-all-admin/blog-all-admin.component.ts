import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from "../../../../../services/api/blog.service";
import { RouterLink } from "@angular/router";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-blog-all-admin',
  standalone: true,
  imports: [ CommonModule, RouterLink, GoBackComponent ],
  templateUrl: './blog-all-admin.component.html'
})
export class BlogAllAdminComponent implements OnInit {

  _blogService = inject(BlogService)

  blogs$: Observable<any> = of([])

  ngOnInit() {
    this.getAllBlogs()
  }

  getAllBlogs() {
    this.blogs$ = this._blogService.getAllBlogsAdmin()
  }

  deleteById(id: string | undefined) {
    if (id) {
      this._blogService.deleteBlogById(id).subscribe()
      this.getAllBlogs()
    } else {
      console.error('Blog by id doesnt exist')
    }
  }

}
