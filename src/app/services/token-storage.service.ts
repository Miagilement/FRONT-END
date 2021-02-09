import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const UID_KEY = 'auth-uid'
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  public saveUid(uid:string){
    window.localStorage.removeItem(UID_KEY);
    window.localStorage.setItem(UID_KEY, uid);
  }

  public getUid() {
    return localStorage.getItem(UID_KEY);
  }
}
