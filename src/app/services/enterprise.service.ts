import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Enterprise} from '../interfaces/Enterprise';
import {EnterpriseReqVO} from '../interfaces/VO/req/EnterpriseReqVO';
import {BaseResVO} from '../interfaces/VO/res/BaseResVO';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

//on import un http pour pouvoir l'utiliser dans nos méthodes.
  constructor(private http: HttpClient) {
  }

//la méthode getEntreprise qui permet de récuperer la totalité des entreprises inscrites.
  getEnterprise(): Observable<BaseResVO> {
    return this.http.post<BaseResVO>('/api/info/enterprise/find-all-enterprise', null, this.httpOptions);
  }

//la méthode getEntrepriseById permet de récuper l'ensemble des données qui concerne une entreprise.
  getEnterpriseById(id: string): Observable<BaseResVO> {
    const url = `${'/api/info/enterprise/find-by-id'}/${id}`;
    return this.http.post<BaseResVO>(url, null)
      .pipe(tap(_ => console.log(`detail Entreprise avec id=${id}`)));
  }

//la méthode addEntreprise permet de rajouter une entreprise.
  addEnterprise(entreprise: Enterprise): Observable<BaseResVO> {
    let enterpriseRegisterReqVO = new EnterpriseReqVO(entreprise);
    console.log(enterpriseRegisterReqVO);
    return this.http.post<BaseResVO>('/api/user/enterprise/register', enterpriseRegisterReqVO, this.httpOptions)
      .pipe(tap((baseResVO: BaseResVO) => console.log(baseResVO)));
  }

  getEntrepriseByAttributes(region: string, sector: string): Observable<BaseResVO> {
    const url = `${'/api/info/enterprise/find-by-attribute'}/${region}/${sector}`;
    return this.http.post<BaseResVO>(url, null)
      .pipe(tap((baseResVO: BaseResVO) => console.log(baseResVO)));
  }
}
