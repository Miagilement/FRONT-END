import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  //récupération et traitement des données saisies par l'utilisateur.
  connexionUserForm = this.fb.group({
    userEmail: ['', Validators.required],
    userPassword: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  lienEnt(): void {
    console.log('helloWorld');

  }

  onSubmit(): void {
    console.log(this.connexionUserForm.value);
  }

}
