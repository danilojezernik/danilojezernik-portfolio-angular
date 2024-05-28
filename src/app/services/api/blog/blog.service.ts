import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Blog } from "../../../models/blog";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  _http = inject(HttpClient)

  getAllBlogs(): Observable<Blog[]> {
    return this._http.get<Blog[]>(`${environment.localUrl}blog`)
  }
}
