import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {BaseResVO} from "../interfaces/VO/res/BaseResVO";
import { Profile } from '../interfaces/profile';
import { ProfileRegisterReqVO } from '../interfaces/VO/req/ProfileRegisterReqVO';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  httpOptions ={
    headers : new HttpHeaders({'Content-Type':'application/json'})  
  }

  constructor(private http:HttpClient) { }

  addProfil(profil : Profile) : Observable<BaseResVO>{
    let profileRegisterReqVO = new ProfileRegisterReqVO(profil);
    console.groupCollapsed(profileRegisterReqVO)
    return this.http.post<BaseResVO>("/api/user/particulier/register", profileRegisterReqVO, this.httpOptions)
    .pipe(tap((baseResVO:BaseResVO) => console.log(baseResVO)));

  }

}
