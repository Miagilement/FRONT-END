import {Component, OnInit} from '@angular/core';
import {ForumSubject} from '../../interfaces/ForumSubject';
import {ForumService} from 'src/app/services/forum.service';
import {BaseResVO} from '../../interfaces/VO/res/BaseResVO';

@Component({
  selector: 'app-forum-acceuil',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.css']
})
export class ForumHomeComponent implements OnInit {

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
}
