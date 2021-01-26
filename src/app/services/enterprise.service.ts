import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enterprise } from '../interfaces/Enterprise';
import { tap, catchError } from 'rxjs/operators';
import { EnterpriseRegisterReqVO } from "../interfaces/VO/req/EnterpriseRegisterReqVO";
import {BaseResVO} from "../interfaces/VO/res/BaseResVO";

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  // private apiEnterpriseUrl = "localhost:8000/user/enterprise/register";


  httpOptions ={
    headers : new HttpHeaders({'Content-Type':'application/json'})
  };

//on import un http pour pouvoir l'utiliser dans nos méthodes.
  constructor(private http:HttpClient) { }

//la méthode getEntreprise qui permet de récuperer la totalité des entreprises inscrit.
  getEnterprise():Observable<BaseResVO>{
    return this.http.post<BaseResVO>("/api/info/enterprise/find-all-enterprise", null, this.httpOptions);
  }

//la méthode getEntrepriseById permet de récuper l'ensemble des données qui concerne une entreprise.
  getEnterpriseById(id: string):Observable<BaseResVO>{
    const url = `${"/api/info/enterprise/find-by-id"}/${id}`;
    return this.http.post<BaseResVO>(url,null)
    .pipe(tap(_=>console.log(`detail Enterprise avec id=${id}`)));
  }

//la méthode addEntreprise permet de rajouter une entreprise.
  addEnterprise(entreprise : Enterprise): Observable<BaseResVO>{
    let enterpriseRegisterReqVO = new EnterpriseRegisterReqVO(entreprise);
    console.log(enterpriseRegisterReqVO)
    return this.http.post<BaseResVO>("/api/user/enterprise/register", enterpriseRegisterReqVO, this.httpOptions)
    .pipe(tap((baseResVO:BaseResVO) => console.log(baseResVO)));
  }
//code pas encore utiliser
  /*updateEnterprise(entreprise : Entreprise): Observable<any>{
    const id = typeof entreprise === 'string'?entreprise:entreprise.uid;
    const url = `${"/api/user/enterprise/register"}/${id}`;

    return this.http.put(url, entreprise, this.httpOptions)
    .pipe(tap(_=> console.log(`Entreprise avec l'id = ${entreprise.uid} a été mis à jour `)));
  }

  deleteEnterprise(entreprise : Entreprise|string): Observable<Entreprise>{
    const id = typeof entreprise === 'string'?entreprise:entreprise.uid;
    const url = `${"/api/user/enterprise/register"}/${id}`;
    return this.http.delete<Entreprise>(url, this.httpOptions)
    .pipe(tap(_=> console.log(`Entreprise avec id=${id} a été supprimer`)));
  }*/

}
