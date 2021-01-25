import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ForumSubjects } from 'src/app/interfaces/ForumSubjects';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum-new',
  templateUrl: './forum-new.component.html',
  styleUrls: ['./forum-new.component.css']
})
export class ForumNewComponent implements OnInit {
  subjects :ForumSubjects[] = [];
  cheminPlus:any = "../../assets/plus.png";
  constructor(
    private fb: FormBuilder,
    private forumService : ForumService
  ) { }

  ngOnInit(): void {
  }
  //récupération et traitement des données saisies par l'utilisateur.
  newSubjectForm= this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
  });

  //On fait appel au service addEntrprise qui se trouve dans service.
  addSubject(): void {
    this.forumService.addSubject(this.newSubjectForm.value);
    console.log(this.newSubjectForm.value);
  }
  /*configuration permettant de faire fonctionner l'éditeur de texte. pour plus
  de renseignement sur l'API utiliser https://www.npmjs.com/package/@kolkov/angular-editor */
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Description...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
}

  
}
