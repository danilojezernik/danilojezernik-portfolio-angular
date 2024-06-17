import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from "../../../../../services/api/blog.service";
import { BlogModel } from "../../../../../models/blog.model";
import { FormsModule } from "@angular/forms";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-blog-admin',
  standalone: true,
  imports: [ CommonModule, FormsModule, MatSnackBarModule ],
  templateUrl: './add-blog-admin.component.html'
})
export class AddBlogAdminComponent {

  private _blogService = inject(BlogService)
  private _snackBar = inject(MatSnackBar)
  private _router = inject(Router)

  addNaslov: string = ''
  addPodnaslov: string = ''
  addKategorija: string = ''
  addVsebina: string = ''
  addImage: string = ''

  addNewBlog() {

    const newData: BlogModel = {
      naslov: this.addNaslov,
      podnaslov: this.addPodnaslov,
      kategorija: this.addKategorija,
      vsebina: this.addVsebina,
      image: this.addImage,
      datum_vnosa: new Date().toISOString()
    }

    if ((newData.naslov && newData.vsebina) === '') {
      this._snackBar.open('Insert naslov and vsebino')
    } else {
      this._blogService.addBlog(newData).subscribe()
      this._router.navigate([ 'blog-admin' ])
    }
  }

}
