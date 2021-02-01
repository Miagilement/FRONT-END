import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumSubject } from 'src/app/interfaces/ForumSubject';
import { BaseResVO } from 'src/app/interfaces/VO/res/BaseResVO';
import { ForumService } from 'src/app/services/forum.service';
import { ForumComment } from 'src/app/interfaces/ForumComment';

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.css']
})
export class ForumDetailsComponent implements OnInit {
  forumSubject: ForumSubject[] = [];
  private id: string;
  forumComment: ForumComment[]=[];

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.getApiSubjectById();
    this.getApiCommentBySubject();
  }

  getApiSubjectById(): void {
    this.id = this.route.snapshot.queryParams['id'];
    console.log(this.id);
    this.forumService.getSubjectById(this.id)
      .subscribe((baseResVO: BaseResVO) => {
        console.log(baseResVO.data);
        this.forumSubject = <ForumSubject[]> baseResVO.data;
      });
  }

  getApiCommentBySubject(): void {
    this.id = this.route.snapshot.queryParams['id'];
    console.log(this.id);
    this.forumService.getCommentBySubject(this.id)
      .subscribe((baseResVO: BaseResVO) => {
        console.log(baseResVO.data);
        this.forumComment = <ForumComment[]> baseResVO.data;
      });
  }

}
