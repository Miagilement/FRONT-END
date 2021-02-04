import {Component, NgModule, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {BaseResVO} from 'src/app/interfaces/VO/res/BaseResVO';
import {Region} from '../../interfaces/Region';
import {matchingPassword} from '../../validator/pswValidator';
import {conditionSelected} from 'src/app/validator/conditionValidator';
import {Enterprise} from 'src/app/interfaces/Enterprise';
import {EnterpriseService} from 'src/app/services/enterprise.service';

@Component({
  selector: 'app-inscription-ent',
  templateUrl: './inscription-ent.component.html',
  styleUrls: ['./inscription-ent.component.css']
})
export class InscriptionEntComponent implements OnInit {

  entreprise: Enterprise[] = [];
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
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
      pswConfirm: ['', Validators.required],
      groupAffiliated: ['', Validators.required],
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
    private enterpriseService: EnterpriseService
  ) {
  }

  ngOnInit(): void {
    this.pswConfirm = this.inscriptionsForm.controls['pswConfirm'];
    this.conditionSelected = this.inscriptionsForm.controls['conditionUser'];
  }

//la méthode utiliser pour ajouter une nouvelle entreprise via le formulaire d'inscription.

//On fait appel au service addEntrprise qui se trouve dans service.
  addEnterprise(): void {
    this.loginWarningShow = false;
    this.paraDangerShow = false;
    this.enterpriseService.addEnterprise(this.inscriptionsForm.value)
      .subscribe(baseResVO => {
          this.info = baseResVO;
          console.log(this.inscriptionsForm);
          switch (this.info.code) {
            case 0:
              this.entreprise.push(<Enterprise> this.info.data);
              this.resetInscriptionForm();
              ($('#showMessage') as any).modal('show');
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
    if (this.pswConfirm.hasError('pswMatchesConfirm')) {
      console.log(this.pswConfirm.value);
      return true;
    }
    return false;
  }

  onSubmit(): void {
    console.log(this.inscriptionsForm.value);
  }

}
