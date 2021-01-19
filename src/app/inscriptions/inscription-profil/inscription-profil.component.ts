import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inscription-profil',
  templateUrl: './inscription-profil.component.html',
  styleUrls: ['./inscription-profil.component.css']
})
export class InscriptionProfilComponent implements OnInit {

  constructor(
    private fb : FormBuilder
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

  onSubmit() : void {
    console.log(this.inscriptionsUserForm.value)
  }

}
