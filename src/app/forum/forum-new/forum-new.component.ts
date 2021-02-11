import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {ForumSubject} from 'src/app/interfaces/ForumSubject';
import {BaseResVO} from 'src/app/interfaces/VO/res/BaseResVO';
import {ForumService} from 'src/app/services/forum.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {ForumTag} from '../../interfaces/ForumTag';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-forum-new',
  templateUrl: './forum-new.component.html',
  styleUrls: ['./forum-new.component.css']
})

export class ForumNewComponent implements OnInit {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTag: Observable<ForumTag[]>;
  tags: ForumTag[] = [];
  tagList: ForumTag[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

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
    height: '120',
    minHeight: '120',
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
    private forumService: ForumService,
    public dialogRef: MatDialogRef<ForumNewComponent>
  ) {
    this.filteredTag = this.tagCtrl.valueChanges.pipe(
      map((tag: string | null) => tag ? this._filter(tag) : this.tagList.slice()));
  }


  ngOnInit(): void {
    this.getApiForumTag();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //On fait appel au service addEntrprise qui se trouve dans service.
  addSubject(): void {
    this.forumService.addSubject(this.newSubjectForm.value, this.tags).subscribe((data) => console.log(data));
    console.log(this.newSubjectForm.value);
    this.dialogRef.close();
    this.ngOnInit();
    // ($('#showMesssage') as any).modal('show');
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(new class implements ForumTag {
        tagId: number;
        tagName: string = value.trim();
      });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.tagCtrl.setValue(null);
  }

  remove(tagName: string): void {
    let index: number;
    this.tags.forEach((tag) => {
      if (tag.tagName === tagName) {
        index = this.tags.indexOf(tag);
      }
    });


    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  getApiForumTag(): void {
    this.forumService.getAllTags()
      .subscribe((baseResVO: BaseResVO) => {
        let tags: ForumTag[] = <ForumTag[]> baseResVO.data;
        tags.forEach(tag => this.tagList.push(tag));
      });
  }

  private _filter(value: string): ForumTag[] {
    return this.tagList.filter(tag => tag.tagName.toLowerCase().indexOf(value) === 0);
  }
}
