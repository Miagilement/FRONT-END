import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import {BaseResVO} from '../interfaces/VO/res/BaseResVO';
import {UserLoginInfo} from '../interfaces/UserLoginInfo';
import {Enterprise} from '../interfaces/Enterprise';
import * as $ from 'jquery';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  userloginInfo : UserLoginInfo;

  //récupération et traitement des données saisies par l'utilisateur.
  connexionUserForm = this.fb.group({
    userEmail: ['', Validators.required],
    userPassword: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit() {
    this.authService.login(this.connexionUserForm.value).subscribe(
      (baseResVO: BaseResVO) => {

        switch (baseResVO.code) {
          case 0:
            this.userloginInfo = <UserLoginInfo> baseResVO.data;
            console.log(this.userloginInfo);
            this.tokenStorage.saveToken(this.userloginInfo.jwt);
            this.tokenStorage.saveUser(this.userloginInfo.userEmail);

            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
            ($('#showMessage') as any).modal('show');
        }
      }
    );
  }

}
