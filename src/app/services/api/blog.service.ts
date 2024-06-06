import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BlogModel } from "../../models/blog.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  _http = inject(HttpClient)

  getAllBlogs(): Observable<BlogModel[]> {
    return this._http.get<BlogModel[]>(`${environment.localUrl}blog`)
  }

  getBlogById(id: string): Observable<BlogModel> {
    return this._http.get<BlogModel>(`${environment.localUrl}blog/${id}`)
  }
}
