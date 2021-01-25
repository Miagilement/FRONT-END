import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { profile } from '../interfaces/Profile';
import { tap, catchError } from 'rxjs/operators';
import { ProfileRegisterReqVO } from "../interfaces/VO/req/ProfileRegisterReqVO";
import {BaseResVO} from "../interfaces/VO/res/BaseResVO";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  httpOptions ={
    headers : new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private http:HttpClient) { }

  addProfil(profile : profile) : Observable<BaseResVO>{
    let particulierRegisterReqVO = new ProfileRegisterReqVO(profile);
    console.groupCollapsed(particulierRegisterReqVO)
    return this.http.post<BaseResVO>("/api/user/particulier/register", particulierRegisterReqVO, this.httpOptions)
    .pipe(tap((baseResVO:BaseResVO) => console.log(baseResVO)));

  }

}
