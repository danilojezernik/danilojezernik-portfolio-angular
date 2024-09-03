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

  /**
   * Use function to get projects pictures
   */
  public getProjectImageUrl(imageName: string): string {
    return `${environment.projectsUrl.publicMedia}${imageName}`
  }

  /**
   * Use function to get technologies pictures
   */

  public getAngularImageUrl(imageName: string): string {
    return `${environment.angularUrl.publicMedia}${imageName}`
  }

  public getVueImageUrl(imageName: string): string {
    return `${environment.vueUrl.publicMedia}${imageName}`
  }

  public getPythonImageUrl(imageName: string): string {
    return `${environment.pythonUrl.publicMedia}${imageName}`
  }

  public getJavaScriptImageUrl(imageName: string): string {
    return `${environment.javascriptUrl.publicMedia}${imageName}`
  }

  public getTypeScriptImageUrl(imageName: string): string {
    return `${environment.typescriptUrl.publicMedia}${imageName}`
  }

  public getMongoDbImageUrl(imageName: string): string {
    return `${environment.mongodbUrl.publicMedia}${imageName}`
  }

}
