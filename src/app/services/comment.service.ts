import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {ForumComment} from '../interfaces/ForumComment';
import {ForumCommentReqVO} from '../interfaces/VO/req/ForumCommentReqVO';
import {BaseResVO} from '../interfaces/VO/res/BaseResVO';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getCommentSubjects(): Observable<BaseResVO> {
    return this.http.post<BaseResVO>('/api/forum/comment/find-all-comments-by-subject/{subjectId}', null, this.httpOptions);

  }


  
  addComment(forumComment: ForumComment): Observable<BaseResVO> {
    const commentRegisterReqVO = new ForumCommentReqVO(forumComment);
    return this.http.post<BaseResVO>('/api/forum/comment/add-forum-comment', commentRegisterReqVO, this.httpOptions)
      .pipe(tap((baseResVO: BaseResVO) => console.log(baseResVO)));

  }

  getCommentBySubject(id: string):Observable<BaseResVO>{
    const url = `${"/api/forum/comment/find-all-comments-by-subject"}/${id}`;
    return this.http.post<BaseResVO>(url,null)
      .pipe(tap((baseResVO: BaseResVO) => console.log(baseResVO)));
  }
  

  deleteCommentById(commentId: number):Observable<BaseResVO> {
    const url = `${"/api/forum/comment/delete-comment"}/${commentId}`;
    return this.http.post<BaseResVO>(url,null)
    .pipe(tap(_=>console.log(`suppression du commentaire =${commentId}`)));

  }

}
