import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetImageService {

  /**
   * Use function to get about me pictures
   */
  public getImageUrl(imageName: string): string {
    return `${environment.mediaUrl.public}/${imageName}`
  }

  /**
   * Use function to get blog pictures
   */
  public getBookImageUrl(imageName: string): string {
    return `${environment.bookUrl.publicMedia}${imageName}`
  }

  /**
   * Use function to get blog pictures
   */
  public getBlogImageUrl(imageName: string): string {
    return `${environment.blogUrl.publicMedia}${imageName}`
  }

}
