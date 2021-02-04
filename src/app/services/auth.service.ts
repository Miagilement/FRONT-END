import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions ={
    headers : new HttpHeaders({'Content-Type':'application/json'})
  };
  authenticated = false;
  constructor(private http : HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post("api/user/login", {
      userEmail: credentials.userEmail,
      jwt: credentials.jwt,
      roles: credentials.roles
    }, this.httpOptions);
  }
  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('user', {headers: headers}).subscribe(response => {
        if (response['name']) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        return callback && callback();
    });

}
}
