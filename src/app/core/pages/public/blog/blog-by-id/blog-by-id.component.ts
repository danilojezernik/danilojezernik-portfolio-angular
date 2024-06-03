import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { BlogService } from "../../../../../services/api/blog/blog.service";
import { Observable } from "rxjs";
import { BlogModel } from "../../../../../models/blog.model";

@Component({
  selector: 'app-blog-by-id',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './blog-by-id.component.html'
})
export class BlogByIdComponent implements OnInit {

  _route = inject(ActivatedRoute)
  _blogService = inject(BlogService)

  blogId$!: Observable<BlogModel>

  ngOnInit() {
    const blogId = this._route.snapshot.paramMap.get('id') || ''

    if (blogId)
      this.getBlogById(blogId)
  }

  getBlogById(blogId: string) {
    this.blogId$ = this._blogService.getBlogById(blogId)
  }

}
