import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyGalleryService} from "../../../services/api/my-gallery.service";
import {Observable} from "rxjs";
import {GetImageService} from "../../../services/get-image/get-image.service";

@Component({
  selector: 'app-my-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-gallery.component.html'
})
export class MyGalleryComponent implements OnInit {

  private _myGalleryService = inject(MyGalleryService)
  protected _getImageByName = inject(GetImageService)

  images$!: Observable<{ images: string[] }>

  ngOnInit(): void {
    this.images$ = this._myGalleryService.getAllImages()
  }

}
