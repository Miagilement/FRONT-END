import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder, FormGroup } from '@angular/forms';

import { Entreprise } from 'src/app/interfaces/entreprise';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import * as $ from 'jquery';
import { BaseResVO } from 'src/app/interfaces/VO/res/BaseResVO';

@Component({
  selector: 'app-inscription-ent',
  templateUrl: './inscription-ent.component.html',
  styleUrls: ['./inscription-ent.component.css']
})
export class InscriptionEntComponent implements OnInit {

  entreprise : Entreprise[]=[];
  info : BaseResVO;
  constructor(
    private fb : FormBuilder,
    private entrepriseService : EntrepriseService
  ) { }

  ngOnInit(): void {
  }

//récupération et traitement des données saisies par l'utilisateur.
    inscriptionsForm = this.fb.group({
      nameEnterprise: ['', Validators.required],
      password: ['', Validators.required],
      groupAffiliated: ['', Validators.required],
      sectorActivity: ['', Validators.required],
      region: ['', Validators.required],
      turnOver: ['', Validators.required],
      description: ['', Validators.required],
      siret: ['', Validators.required]
    });
//la méthode utiliser pour ajouter une nouvelle entreprise via le formulaire d'inscription. 
//On fait appel au service addEntrprise qui se trouve dans service.
    addEntreprise():void{
      this.entrepriseService.addEntreprise(this.inscriptionsForm.value)
      .subscribe(baseResVO =>  {this.entreprise.push(<Entreprise>baseResVO.data)});
      this.resetInscriptionForm();
      $('#showMesssage').modal('show');
    }
//la méthode resetInscriptionForm permet d'effacer le contenu des champ après l'envoi des données.
//on fait appel à cette méthode dans le addEntreprise.
  resetInscriptionForm(){
    this.inscriptionsForm.reset();
  }
}
