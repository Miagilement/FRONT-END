import { Component, OnInit } from '@angular/core';
// import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {profile} from 'src/app/interfaces/profile';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import {matchingPassword} from "../../validator/pswValidator";
import {conditionSelected} from 'src/app/validator/conditionValidator';
import * as $ from 'jquery';
import {BaseResVO} from 'src/app/interfaces/VO/res/BaseResVO';

@Component({
  selector: 'app-inscription-profil',
  templateUrl: './inscription-profil.component.html',
  styleUrls: ['./inscription-profil.component.css']
})
export class InscriptionProfilComponent implements OnInit {

  profile: profile[] = []
  info: BaseResVO;
  errorMessage: any;
  hide = true;
  loginWarningShow = false;
  paraDangerShow = false;
  pswConfirm: AbstractControl;
  conditionSelected: AbstractControl;


  constructor(
    private fb : FormBuilder,
    private profileService: ProfileService
  ) { }


  ngOnInit(): void {
  }


  //récupération et traitement des données saisies par l'utilisateur.
  inscriptionsUserForm = this.fb.group({
  userName: ['', Validators.required],
  userPassword: ['', Validators.required],
  userPasswordConf: ['', Validators.required],
  userEmail: ['', Validators.required],
  userType: ['', Validators.required],
  });

  addProfil(): void {
    this.loginWarningShow = false;
    this.paraDangerShow = false;
    this.profileService.addProfil(this.inscriptionsUserForm.value)
      .subscribe(baseResVO => {
          this.info = baseResVO;
          console.log(this.info.code);
          switch (this.info.code) {
            case 0:
              this.profile.push(<profile>this.info.data);
              this.resetInscriptionForm();
              $('#showMesssage').modal('show');
            case 2:
              this.paraDangerShow = true;
              this.errorMessage = this.info.data;
            case 6:
              this.loginWarningShow = true;
              this.errorMessage = this.info.data;
          }
        }
      );
  }

  //on fait appel à cette méthode dans le addEntreprise.
  resetInscriptionForm() {
    this.inscriptionsUserForm.reset();
  }

  onSubmit() : void {
    console.log(this.inscriptionsUserForm.value)
  }
}
