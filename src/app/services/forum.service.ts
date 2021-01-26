import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { ForumSubject } from '../interfaces/ForumSubject';
import { ForumRegisterReqVO } from '../interfaces/VO/req/ForumSubjectReqVO';
import { BaseResVO } from '../interfaces/VO/res/BaseResVO';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  
  httpOptions ={
    headers : new HttpHeaders({'Content-Type':'application/json'})
  };
  constructor(private http:HttpClient) { }

  getForumSubjects():Observable<BaseResVO>{
    return this.http.post<BaseResVO>("/api/forum/find-all-forum-subjects", null, this.httpOptions);
  }

  addSubject(forumSubject : ForumSubject) : Observable<BaseResVO>{
    let forumRegisterReqVO = new ForumRegisterReqVO(forumSubject);
    console.groupCollapsed(forumRegisterReqVO)
    return this.http.post<BaseResVO>("/api/forum/add-forum-subject", forumRegisterReqVO, this.httpOptions)
    .pipe(tap((baseResVO:BaseResVO) => console.log(baseResVO)));
  }

}
