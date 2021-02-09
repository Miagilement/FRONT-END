import {Component, OnInit} from '@angular/core';
import {ForumSubject} from '../../interfaces/ForumSubject';
import {ForumService} from 'src/app/services/forum.service';
import {BaseResVO} from '../../interfaces/VO/res/BaseResVO';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Sujet {
  name: string;
} 

@Component({
  selector: 'app-forum-acceuil',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.css']
})
export class ForumHomeComponent implements OnInit, Sujet {
  name: string;
  forumSubjects: ForumSubject[] = [];
  pathPlus: any = '../../assets/plus.png';
  p: number = 1;
  constructor(
    private forumService: ForumService
  ) {
  }

  ngOnInit(): void {
    this.getApiForumSubjects();
  }

  getApiForumSubjects(): void {
    this.forumService.getForumSubjects()
      .subscribe((baseResVO: BaseResVO) => {
        console.log(baseResVO.data);
        this.forumSubjects = <ForumSubject[]> baseResVO.data;
      });
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
