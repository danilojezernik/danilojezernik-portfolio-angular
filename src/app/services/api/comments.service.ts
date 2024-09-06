import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../../models/comment";
import {environment} from "../../../environments/environment";
import {PAGINATION} from "../../shared/global-const/global.const";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC
   */

  getAllCommentsPublic(): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${environment.commentUrl.public}`)
  }

  getCommentsOfBlogPublic(blogId: string, limit: number = PAGINATION.commentLImit, offset: number = 0): Observable<{ total_count: number, comments: Comment[] }> {
    return this._http.get<{ total_count: number, comments: Comment[] }>(`${environment.commentUrl.public}/${blogId}`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString(),
      },
    })
  }

  addCommentToBlogPost(blogId: string, newBody: Comment): Observable<Comment> {
    return this._http.post<Comment>(`${environment.commentUrl.public}/${blogId}`, newBody)
  }

  /**
   * PRIVATE
   */

  getAllCommentsAdmin(): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${environment.commentUrl.admin}`)
  }

  getCommentsOfBlogAdmin(blogId: string): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${environment.commentUrl.admin}${blogId}`)
  }

  getCommentByIdAdmin(id: string): Observable<Comment> {
    return this._http.get<Comment>(`${environment.commentUrl.admin}${id}`)
  }

  addCommentToBlogAdmin(blogId: string, newBody: Comment): Observable<Comment> {
    return this._http.post<Comment>(`${environment.commentUrl.admin}${blogId}`, newBody)
  }

  editCommentByIdAdmin(commentId: string, newBody: Comment): Observable<Comment> {
    return this._http.put<Comment>(`${environment.commentUrl.admin}${commentId}`, newBody)
  }

  deleteCommentById(blogId: string, commentId: string): Observable<Comment> {
    return this._http.delete<Comment>(`${environment.commentUrl.admin}${blogId}/${commentId}`)
  }
}
