import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserNormal } from '../interfaces/UserNormal';
import { UserNormalRegisterReqVO } from '../interfaces/VO/req/UserNormalRegisterReqVO';
import { BaseResVO } from '../interfaces/VO/res/BaseResVO';

@Injectable({
  providedIn: 'root'
})
export class UserNormalService {

  private uid: string;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http:HttpClient) { }

  addProfil(userNormal: UserNormal): Observable<BaseResVO> {
    let profileRegisterReqVO = new UserNormalRegisterReqVO(userNormal);
    console.groupCollapsed(profileRegisterReqVO);
    return this.http.post<BaseResVO>('/api/user/normal/register', profileRegisterReqVO, this.httpOptions)
      .pipe(tap((baseResVO: BaseResVO) => console.log(baseResVO)));

  }

  getProfileById(id: string):Observable<BaseResVO>{
    const url = `${"/api/info/particulier/find-by-id"}/${id}`;
    return this.http.post<BaseResVO>(url,null)
      .pipe(tap(_=>console.log(`detail Profile avec id=${id}`)));
  }

}
