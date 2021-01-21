import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { particulier } from '../interfaces/profil';
import { tap, catchError } from 'rxjs/operators';
import { ParticulierRegisterReqVO } from "../interfaces/VO/req/ParticulierRegisterReqVO";
import {BaseResVO} from "../interfaces/VO/res/BaseResVO";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  httpOptions ={
    headers : new HttpHeaders({'Content-Type':'application/json'})  
  }

  constructor(private http:HttpClient) { }

  addProfil(profil : particulier) : Observable<BaseResVO>{
    let particulierRegisterReqVO = new ParticulierRegisterReqVO(profil);
    console.groupCollapsed(particulierRegisterReqVO)
    return this.http.post<BaseResVO>("/api/user/particulier/register", particulierRegisterReqVO, this.httpOptions)
    .pipe(tap((baseResVO:BaseResVO) => console.log(baseResVO)));

  }

}
