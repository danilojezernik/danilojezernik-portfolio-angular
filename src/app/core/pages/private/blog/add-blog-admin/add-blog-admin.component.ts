import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from "../../../../../services/api/blog.service";
import { BlogModel } from "../../../../../models/blog.model";
import { FormsModule } from "@angular/forms";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-blog-admin',
  standalone: true,
  imports: [ CommonModule, FormsModule, MatSnackBarModule ],
  templateUrl: './add-blog-admin.component.html'
})
export class AddBlogAdminComponent {

  private _blogService = inject(BlogService)
  private _snackBar = inject(MatSnackBar)

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

    if ((newData.naslov || newData.podnaslov || newData.vsebina) === '')
      this._snackBar.open('Vnesi nekaj')
    else
      this._blogService.addBlog(newData).subscribe()
  }

}
