import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from "../../../../../services/api/blog.service";
import { RouterLink } from "@angular/router";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { Observable } from "rxjs";
import { ShowDataTestComponent } from "../../../../../shared/components/show-data-test/show-data-test.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { DialogComponent } from "../../../../../shared/components/dialogs/dialog/dialog.component";
import { BlogModel } from "../../../../../models/blog.model";

@Component({
  selector: 'app-blog-all-admin',
  standalone: true,
  imports: [ CommonModule, RouterLink, GoBackComponent, ShowDataTestComponent, MatDialogModule ],
  templateUrl: './blog-all-admin.component.html'
})
export class BlogAllAdminComponent implements OnInit {


  private _blogService = inject(BlogService);
  public dialog = inject(MatDialog);

  blogs$!: Observable<BlogModel[]>;
  blogById$!: Observable<BlogModel>;

  ngOnInit() {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.blogs$ = this._blogService.getAllBlogsAdmin();
  }

  getBlogById(id: string) {
    this.blogById$ = this._blogService.getBlogById(id);
  }

  deleteById(id: string | undefined) {
    if (id) {
      this._blogService.deleteBlogById(id).subscribe(() => {
        this.getAllBlogs(); // Refresh the list of blogs after deletion
      });
    } else {
      console.error('Blog by id doesn\'t exist');
    }
  }

  openDialog(id: string) {
    if (id) {
      this.getBlogById(id);
      this.blogById$.subscribe(data => {
        this.dialog.open(DialogComponent, {
          data: {
            title: data.naslov,
            allData: data
          },
          width: '300px',
          height: '300px'
        });
      });
    } else {
      console.error('Blog ID is undefined');
    }
  }

}
