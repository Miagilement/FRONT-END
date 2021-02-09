import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {ForumSubject} from 'src/app/interfaces/ForumSubject';
import {BaseResVO} from 'src/app/interfaces/VO/res/BaseResVO';
import {ForumService} from 'src/app/services/forum.service';
import * as $ from 'jquery';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Sujet {
  name: string;
} 

@Component({
  selector: 'app-forum-new',
  templateUrl: './forum-new.component.html',
  styleUrls: ['./forum-new.component.css']
})
export class ForumNewComponent implements OnInit, Sujet {

  name:string;

  info: BaseResVO;
  errorMessage: any;
  hide = true;
  loginWarningShow = false;
  paraDangerShow = false;
  subjects: ForumSubject[] = [];
  pathPlus: any = '../../assets/plus.png';
  //récupération et traitement des données saisies par l'utilisateur.
  newSubjectForm = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
  });
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
  };

  constructor(
    private fb: FormBuilder,
    private forumService: ForumService
  ) {
  }

  ngOnInit(): void {
  }

  //On fait appel au service addEntrprise qui se trouve dans service.
  addSubject(): void {
    this.forumService.addSubject(this.newSubjectForm.value).subscribe((data) => console.log(data));
    console.log(this.newSubjectForm.value);
    ($('#showMesssage') as any).modal('show');
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  sujets: Sujet[] = [
    {name: 'Datamining'},
    {name: 'Digitalisation'},
    {name: 'ADSL'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our subject
    if ((value || '').trim()) {
      this.sujets.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  //Remove a subject
  remove(sujet: Sujet): void {
    const index = this.sujets.indexOf(sujet);

    if (index >= 0) {
      this.sujets.splice(index, 1);
    }
  }

}
