import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  isUserLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor(private tokenStorageService:TokenStorageService) {
    if(this.tokenStorageService.getUid()){
      this.isUserLoggedIn.next(true);
    }
  }
}
