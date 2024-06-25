import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BlogModel } from "../../models/blog.model";
import { catchError, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ErrorHandleService } from "../error-handle/error-handle.service";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _http = inject(HttpClient)
  private _errorHandleService = inject(ErrorHandleService)

  /**
   * PUBLIC SERVICES
   */
  getAllBlogs(): Observable<BlogModel[]> {
    return this._http.get<BlogModel[]>(`${environment.blogUrl.public}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  getBlogById(id: string): Observable<BlogModel> {
    return this._http.get<BlogModel>(`${environment.blogUrl.public}/${id}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  /**
   * PRIVATE SERVICES
   */
  getAllBlogsAdmin(): Observable<BlogModel[]> {
    return this._http.get<BlogModel[]>(`${environment.blogUrl.admin}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  addBlog(newBlog: BlogModel): Observable<BlogModel> {
    return this._http.post<BlogModel>(`${environment.blogUrl.public}/`, newBlog).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  editBlogById(id: string, newData: BlogModel) {
    return this._http.put<BlogModel>(`${environment.blogUrl.public}/${id}`, newData).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  deleteBlogById(id: string): Observable<BlogModel> {
    return this._http.delete<BlogModel>(`${environment.blogUrl.public}/${id}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

}
