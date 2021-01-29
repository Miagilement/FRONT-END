import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserNormal } from 'src/app/interfaces/UserNormal';
import { BaseResVO } from 'src/app/interfaces/VO/res/BaseResVO';
import { UserNormalService } from 'src/app/services/user-normal.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-inscription-user-normal',
  templateUrl: './inscription-user-normal.component.html',
  styleUrls: ['./inscription-user-normal.component.css']
})
export class InscriptionUserNormalComponent implements OnInit {

  userNormal: UserNormal[] = [];
  info: BaseResVO;
  errorMessage: any;
  hide = true;
  loginWarningShow = false;
  paraDangerShow = false;
  pswConfirm: AbstractControl;
  conditionSelected: AbstractControl;
  //récupération et traitement des données saisies par l'utilisateur.
  inscriptionsUserForm = this.fb.group({
    userName: ['', Validators.required],
    userPassword: ['', Validators.required],
    userPasswordConf: ['', Validators.required],
    userEmail: ['', Validators.required],
    userType: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userNormalService: UserNormalService
  ) {
  }

  ngOnInit(): void {
  }

  /* addProfil(): void {
    this.loginWarningShow = false;
    this.paraDangerShow = false;
    this.userNormalService.addProfil(this.inscriptionsUserForm.value)
      .subscribe(baseResVO => {
          this.info = baseResVO;
          console.log(this.info.code);
          switch (this.info.code) {
            case 0:
              this.userNormal.push(<UserNormal> this.info.data);
              this.resetInscriptionForm();
              //$('#showMesssage').modal('show');
            case 2:
              this.paraDangerShow = true;
              this.errorMessage = this.info.data;
            case 6:
              this.loginWarningShow = true;
              this.errorMessage = this.info.data;
          }
        }
      );
  } */

    //On fait appel au service addEntrprise qui se trouve dans service.
    addProfil(): void {
      this.userNormalService.addProfil(this.inscriptionsUserForm.value).subscribe((data) => console.log(data));
      console.log(this.inscriptionsUserForm.value);
      //$('#showMesssage').modal('show');
    }

  //on fait appel à cette méthode dans le addEntreprise.
  resetInscriptionForm() {
    this.inscriptionsUserForm.reset();
  }

  onSubmit(): void {
    console.log(this.inscriptionsUserForm.value);
  }
}
