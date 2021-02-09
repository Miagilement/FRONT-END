import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Individual } from 'src/app/interfaces/Individual';
import { BaseResVO } from 'src/app/interfaces/VO/res/BaseResVO';
import { IndividualService } from 'src/app/services/individual.service';
import * as $ from 'jquery';
import { matchingPassword } from 'src/app/validator/pswValidator';
import { conditionSelected } from 'src/app/validator/conditionValidator';

@Component({
  selector: 'app-inscription-user-normal',
  templateUrl: './inscription-individual.component.html',
  styleUrls: ['./inscription-individual.component.css']
})
export class InscriptionIndividualComponent implements OnInit {

  individual: Individual[] = [];
  info: BaseResVO;
  errorMessage: any;
  hide = true;
  loginWarningShow = false;
  paraDangerShow = false;
  pswConfirm: AbstractControl;
  conditionSelected: AbstractControl;
  email : string;

  //récupération et traitement des données saisies par l'utilisateur
  //vérification que les données sont bien valides
  inscriptionsIndividualForm = this.fb.group({
    userName: ['', Validators.required],
    userPassword: ['', Validators.required],
    pswConfirm: ['', Validators.required],
    userEmail: ['', Validators.required],
    userType: ['', Validators.required],
    conditionUser: ['', Validators.required]
  },
  //Vérification de l'adéquation entre mdp et confirmation de mdp (validation faite au niveau du front)
  {validator: Validators.compose([matchingPassword(), conditionSelected()])}
  );



  constructor(
    private fb: FormBuilder,
    private individualService: IndividualService
  ) {
  }

  ngOnInit(): void {
    this.pswConfirm = this.inscriptionsIndividualForm.controls['pswConfirm'];
    this.conditionSelected = this.inscriptionsIndividualForm.controls['conditionUser'];
  }

  addIndividual(): void {
    this.loginWarningShow = false;
    this.paraDangerShow = false;
    console.log(this.inscriptionsIndividualForm.value);
    this.individualService.addIndividual(this.inscriptionsIndividualForm.value)
      .subscribe(baseResVO => {
          this.info = baseResVO;
          this.email =this.inscriptionsIndividualForm.controls['userEmail'].value;
          console.log(this.info.code);
          switch (this.info.code) {
            // Si tous les champs sont valides (prédéfinit dans le back dans "ResultEnum")
            case 0:
              this.individual.push(<Individual> this.info.data);
              this.resetInscriptionForm();
              ($('#showMesssage') as any).modal('show');
            // S'il y a une erreure de saisie
            case 2:
              this.paraDangerShow = true;
              this.errorMessage = this.info.data;
            // Si le compte existe déjà (adresse mail déjà utilisée)
            case 6:
              this.loginWarningShow = true;
              this.errorMessage = this.info.data;
          }
        }
      );
  }

    //On fait appel au service addEntrprise qui se trouve dans service.
    // addProfil(): void {
    //   this.userNormalService.addIndividual(this.inscriptionsUserForm.value).subscribe((data) => console.log(data));
    //   console.log(this.inscriptionsUserForm.value);
    //   //$('#showMesssage').modal('show');
    // }

  //on fait appel à cette méthode dans le addEntreprise.
  resetInscriptionForm() {
    this.inscriptionsIndividualForm.reset();
  }

  onSubmit(): void {
    console.log(this.inscriptionsIndividualForm.value);
  }

}
