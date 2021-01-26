import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {BaseResVO} from '../interfaces/VO/res/BaseResVO';
import {Profile} from '../interfaces/profile';
import {ProfileRegisterReqVO} from '../interfaces/VO/req/ProfileRegisterReqVO';
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private uid: string;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http:HttpClient) {
  }

  addProfil(profil: Profile): Observable<BaseResVO> {
    let profileRegisterReqVO = new ProfileRegisterReqVO(profil);
    console.groupCollapsed(profileRegisterReqVO);
    return this.http.post<BaseResVO>('/api/user/particulier/register', profileRegisterReqVO, this.httpOptions)
      .pipe(tap((baseResVO: BaseResVO) => console.log(baseResVO)));

  }

  getProfileById(id: string):Observable<BaseResVO>{
    const url = `${"/api/info/particulier/find-by-id"}/${id}`;
    return this.http.post<BaseResVO>(url,null)
      .pipe(tap(_=>console.log(`detail Profile avec id=${id}`)));
  }

}
