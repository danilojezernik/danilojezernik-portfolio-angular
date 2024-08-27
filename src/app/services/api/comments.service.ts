import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../../models/comment";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private _http = inject(HttpClient)

  getCommentsOfBlog(blogId: string): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${environment.commentUrl.public}/${blogId}`)
  }

  addCommentToBlogPost(blogId: string, newBody: Comment): Observable<Comment> {
    return this._http.post<Comment>(`${environment.commentUrl.public}/${blogId}`, newBody)
  }

  editCommentById(blogId: string, commentId: string, newBody: Comment): Observable<Comment> {
    return this._http.put<Comment>(`${environment.commentUrl.admin}${blogId}/${commentId}`, newBody)
  }

  deleteCommentById(blogId: string, commentId: string): Observable<Comment> {
    return this._http.delete<Comment>(`${environment.commentUrl.admin}${blogId}/${commentId}`)
  }
}
