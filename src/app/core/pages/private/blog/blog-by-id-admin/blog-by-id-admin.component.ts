import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { BlogService } from "../../../../../services/api/blog.service";
import { Observable } from "rxjs";
import { BlogModel } from "../../../../../models/blog.model";

@Component({
  selector: 'app-blog-by-id-admin',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './blog-by-id-admin.component.html'
})
export class BlogByIdAdminComponent implements OnInit {

  private _route = inject(ActivatedRoute)
  private _blogService = inject(BlogService)

  blogById$!: Observable<BlogModel>

  ngOnInit() {
    const blogId = this._route.snapshot.paramMap.get('id') || ''

    if (blogId)
      this.getBlogById(blogId)
  }

  getBlogById(blogId: string) {
    this.blogById$ = this._blogService.getBlogByIdAdmin(blogId)
  }

}
