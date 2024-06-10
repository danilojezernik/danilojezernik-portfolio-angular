import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from "../../../../../services/api/blog.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BlogModel } from "../../../../../models/blog.model";

@Component({
  selector: 'app-blog-edit-by-id-admin',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './blog-edit-by-id-admin.component.html'
})
export class BlogEditByIdAdminComponent implements OnInit {

  private _blogService = inject(BlogService)
  private _activatedRoute = inject(ActivatedRoute)

  addNaslov: string = ''
  addPodnaslov: string = ''
  addKategorija: string = ''
  addVsebina: string = ''
  addImage: string = ''

  ngOnInit() {

    const blogId = this._activatedRoute.snapshot.paramMap.get('id') || ''

    this._blogService.getBlogById(blogId).pipe(
      map(data => {
        this.addNaslov = data.naslov
        this.addPodnaslov = data.podnaslov
        this.addVsebina = data.vsebina
        this.addKategorija = data.kategorija
        this.addImage = data.image
      })
    ).subscribe()

  }

  editBlog() {

    const addNew: BlogModel = {
      naslov: this.addNaslov,
      podnaslov: this.addPodnaslov,
      kategorija: this.addKategorija,
      vsebina: this.addVsebina,
      image: this.addImage,
      datum_vnosa: new Date().toISOString()
    }

    const blogId = this._activatedRoute.snapshot.paramMap.get('id') || ''

    this._blogService.editBlogById(blogId, addNew).subscribe()

  }

}
