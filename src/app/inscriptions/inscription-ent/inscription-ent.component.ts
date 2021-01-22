import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';

import {Entreprise} from 'src/app/interfaces/entreprise';
import {EntrepriseService} from 'src/app/services/entreprise.service';
import * as $ from 'jquery';
import {BaseResVO} from 'src/app/interfaces/VO/res/BaseResVO';
import {Region} from "../../interfaces/Region";
import {matchingPassword} from "../../validator/pswValidator";
import {conditionSelected} from 'src/app/validator/conditionValidator';

@Component({
  selector: 'app-inscription-ent',
  templateUrl: './inscription-ent.component.html',
  styleUrls: ['./inscription-ent.component.css']
})
export class InscriptionEntComponent implements OnInit {

  entreprise: Entreprise[] = [];
  info: BaseResVO;
  errorMessage: any;
  hide = true;
  loginWarningShow = false;
  paraDangerShow = false;
  pswConfirm: AbstractControl;
  conditionSelected: AbstractControl;
  listRegion: Region = new Region();


//récupération et traitement des données saisies par l'utilisateur.
  inscriptionsForm = this.fb.group({
      nameEnterprise: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      pswConfirm: ['', Validators.required],
      groupAffiliated:[''],
      sectorActivity: ['', Validators.required],
      region: ['', Validators.required],
      turnOver: ['', Validators.required],
      description: ['', Validators.required],
      siret: ['', Validators.required],
      conditionUser: ['', Validators.required]
    },
    {validator: Validators.compose([matchingPassword(), conditionSelected()])}
  );

  constructor(
    private fb: FormBuilder,
    private entrepriseService: EntrepriseService
  ) {
  }

  ngOnInit(): void {
    this.pswConfirm = this.inscriptionsForm.controls["pswConfirm"];
    this.conditionSelected = this.inscriptionsForm.controls["conditionUser"]
  }

//la méthode utiliser pour ajouter une nouvelle entreprise via le formulaire d'inscription.

//On fait appel au service addEntrprise qui se trouve dans service.
  addEntreprise(): void {
    this.loginWarningShow = false;
    this.paraDangerShow = false;
    this.entrepriseService.addEntreprise(this.inscriptionsForm.value)
      .subscribe(baseResVO => {
          this.info = baseResVO;
          switch (this.info.code) {
            case 0:
              this.entreprise.push(<Entreprise>this.info.data);
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


    // console.log(this.info.code);
  }

//la méthode resetInscriptionForm permet d'effacer le contenu des champ après l'envoi des données.

//on fait appel à cette méthode dans le addEntreprise.
  resetInscriptionForm() {
    this.inscriptionsForm.reset();
  }

  isPswConfirmValid(): boolean {
    if (this.pswConfirm.hasError("pswMatchesConfirm")) {
      console.log(this.pswConfirm.value);
      return true;
    }
    return false;
  }


}
