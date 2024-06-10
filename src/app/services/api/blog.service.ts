import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BlogModel } from "../../models/blog.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllBlogs(): Observable<BlogModel[]> {
    return this._http.get<BlogModel[]>(`${environment.localUrl}blog`)
  }

  getBlogById(id: string): Observable<BlogModel> {
    return this._http.get<BlogModel>(`${environment.localUrl}blog/${id}`)
  }

  addBlog(newBlog: BlogModel): Observable<BlogModel> {
    return this._http.post<BlogModel>(`${environment.localUrl}blog/`, newBlog)
  }

  editBlogById(id: string, newData: BlogModel) {
    return this._http.put<BlogModel>(`${environment.localUrl}blog/${id}`, newData)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllBlogsAdmin(): Observable<BlogModel[]> {
    return this._http.get<BlogModel[]>(`${environment.localUrl}blog/admin/`)
  }

  getBlogByIdAdmin(id: string): Observable<BlogModel> {
    return this._http.get<BlogModel>(`${environment.localUrl}blog/admin/${id}`)
  }


}
