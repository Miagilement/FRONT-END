import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {ForumSubject} from '../interfaces/ForumSubject';
import {ForumRegisterReqVO} from '../interfaces/VO/req/ForumSubjectReqVO';
import {BaseResVO} from '../interfaces/VO/res/BaseResVO';
import {ForumComment} from '../interfaces/ForumComment';
import {ForumCommentReqVO} from '../interfaces/VO/req/ForumCommentReqVO';
import {TokenStorageService} from './token-storage.service';
import {IndividualService} from './individual.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  getForumSubjects(): Observable<BaseResVO> {
    return this.http.post<BaseResVO>('/api/forum/find-all-forum-subjects', null, this.httpOptions);
  }

  addSubject(forumSubject: ForumSubject): Observable<BaseResVO> {
    forumSubject.authorId = this.tokenStorageService.getUid();
    let forumRegisterReqVO = new ForumRegisterReqVO(forumSubject);
    console.groupCollapsed(forumRegisterReqVO);
    return this.http.post<BaseResVO>('/api/forum/add-forum-subject', forumRegisterReqVO, this.httpOptions)
      .pipe(tap((baseResVO: BaseResVO) => console.log(baseResVO)));
  }

  getSubjectById(id: string):Observable<BaseResVO>{
    const url = `${"/api/forum/find-forum-subject-by-id"}/${id}`;
    return this.http.post<BaseResVO>(url,null)
    .pipe(tap(_=>console.log(`detail Forum avec id=${id}`)));
  }
  searchSubjectByName(title : string) : Observable<BaseResVO[]>{
    if(!title.trim()){
      return of([]);
    }
    return this.http.post<BaseResVO[]>(`${"/api/forum/find-forum-subject-by-title"}/?title=${title}`,null)
    .pipe(tap(x =>
      console.log(`detail Forum avec title=${title}`)));
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
    const url = `${"/api/forum/comment/delete-forum-comment"}/${commentId}`;
    return this.http.post<BaseResVO>(url,null)
      .pipe(tap(_=>console.log(`suppression du commentaire =${commentId}`)));
  }

  getAllTags():Observable<BaseResVO> {
    return this.http.post<BaseResVO>('/api/forum/find-all-tags',null)
      .pipe(tap((baseResVO: BaseResVO) => console.log(baseResVO)));
  }

}
