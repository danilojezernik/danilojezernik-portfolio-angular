import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BlogModel } from "../../models/blog.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllBlogs(): Observable<BlogModel[]> {
    return this._http.get<BlogModel[]>(`${environment.blogUrl.public}`)
  }

  getBlogById(id: string): Observable<BlogModel> {
    return this._http.get<BlogModel>(`${environment.blogUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllBlogsAdmin(): Observable<BlogModel[]> {
    return this._http.get<BlogModel[]>(`${environment.blogUrl.admin}`)
  }

  addBlog(newBlog: BlogModel): Observable<BlogModel> {
    return this._http.post<BlogModel>(`${environment.blogUrl.public}/`, newBlog)
  }

  editBlogById(id: string, newBlog: BlogModel) {
    return this._http.put<BlogModel>(`${environment.blogUrl.public}/${id}`, newBlog)
  }

  deleteBlogById(id: string): Observable<BlogModel> {
    return this._http.delete<BlogModel>(`${environment.blogUrl.public}/${id}`)
  }

  /**
   * PUBLIC MEDIA SERVICE
   */
  getAllBlogsImages(): Observable<{ images: string[] }> {
    return this._http.get<{ images: string[] }>(`${environment.blogUrl.public}/images/`)
  }

  /**
   * PRIVATE MEDIA SERVICE
   */
  deleteBlogImageByName(filename: string): Observable<string> {
    return this._http.delete<string>(`${environment.blogUrl.publicMedia}${filename}`)
  }

  uploadBlogImage(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)

    return this._http.post<any>(`${environment.blogUrl.publicMedia}`, formData)
  }
}
