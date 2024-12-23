import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyGalleryService} from "../../../services/api/my-gallery.service";
import {Observable} from "rxjs";
import {GetImageService} from "../../../services/get-image/get-image.service";
import {HeroTitleComponent} from "../hero-title/hero-title.component";

@Component({
  selector: 'app-my-gallery',
  standalone: true,
  imports: [CommonModule, HeroTitleComponent],
  templateUrl: './my-gallery.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyGalleryComponent implements OnInit {

  private _myGalleryService = inject(MyGalleryService)
  protected _getImageByName = inject(GetImageService)

  images$!: Observable<{ images: string[] }>

  ngOnInit(): void {
    this.images$ = this._myGalleryService.getAllImages()
  }

}
