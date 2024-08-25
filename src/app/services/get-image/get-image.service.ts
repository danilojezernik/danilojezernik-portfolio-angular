import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetImageService {

  public getImageUrl(imageName: string): string {
    return `${environment.mediaUrl.public}/${imageName}`
  }

}
