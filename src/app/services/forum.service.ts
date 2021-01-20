import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
