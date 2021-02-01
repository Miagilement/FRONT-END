import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Individual } from '../interfaces/Individual';
import { IndividualReqVO } from '../interfaces/VO/req/IndividualReqVO';
import { BaseResVO } from '../interfaces/VO/res/BaseResVO';

@Injectable({
  providedIn: 'root'
})
export class IndividualService {

  private uid: string;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http:HttpClient) { }

  addIndividual(userNormal: Individual): Observable<BaseResVO> {
    let profileRegisterReqVO = new IndividualReqVO(userNormal);
    console.groupCollapsed(profileRegisterReqVO);
    return this.http.post<BaseResVO>('/api/user/individual/register', profileRegisterReqVO, this.httpOptions)
      .pipe(tap((baseResVO: BaseResVO) => console.log(baseResVO)));

  }

  getIndividualById(id: string):Observable<BaseResVO>{
    const url = `${"/api/info/individual/find-by-id"}/${id}`;
    return this.http.post<BaseResVO>(url,null)
      .pipe(tap(_=>console.log(`detail Profile avec id=${id}`)));
  }

}
