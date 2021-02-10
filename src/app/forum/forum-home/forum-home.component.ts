import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ForumSubject} from '../../interfaces/ForumSubject';
import {ForumService} from 'src/app/services/forum.service';
import {BaseResVO} from '../../interfaces/VO/res/BaseResVO';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {ForumTag} from '../../interfaces/ForumTag';
import {MatDialog} from '@angular/material/dialog';
import {ForumNewComponent} from '../forum-new/forum-new.component';

@Component({
  selector: 'app-forum-acceuil',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.css']
})
export class ForumHomeComponent implements OnInit {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTag: Observable<string[]>;
  tags: ForumTag[] = [];
  tagList: string[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  forumSubjects: ForumSubject[] = [];
  pathPlus: any = '../../assets/plus.png';
  p: number = 1;
  constructor(
    private forumService: ForumService,
    public dialog: MatDialog
  ) {
    this.filteredTag = this.tagCtrl.valueChanges.pipe(
    map((tag: string | null) => tag ? this._filter(tag) : this.tagList.slice()));
  }

  ngOnInit(): void {
    this.getApiForumSubjects();
    this.getApiForumTag();

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
      if(tag.tagName === tagName){
        index = this.tags.indexOf(tag);
      }
    })


    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(new class implements ForumTag {
      tagId: number;
      tagName: string = event.option.viewValue;
    });
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagList.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  getApiForumSubjects(): void {
    this.forumService.getForumSubjects()
      .subscribe((baseResVO: BaseResVO) => {
        this.forumSubjects = <ForumSubject[]> baseResVO.data;
      });
  }

  getApiForumTag(): void {
    this.forumService.getAllTags()
      .subscribe((baseResVO: BaseResVO) => {
        let tags:ForumTag[] = <ForumTag[]>baseResVO.data;
        tags.forEach(tag=>this.tagList.push(tag.tagName));
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ForumNewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getApiForumSubjects();
    });
  }
}
