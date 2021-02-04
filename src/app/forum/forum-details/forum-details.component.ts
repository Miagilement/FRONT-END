import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumSubject } from 'src/app/interfaces/ForumSubject';
import { BaseResVO } from 'src/app/interfaces/VO/res/BaseResVO';
import { ForumService } from 'src/app/services/forum.service';
import { ForumComment } from 'src/app/interfaces/ForumComment';
import { CommentService } from 'src/app/services/comment.service';
import {FormBuilder, Validators} from '@angular/forms';





@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.css']
})
export class ForumDetailsComponent implements OnInit {
  forumSubject: ForumSubject[] = [];
  private id: string;
  forumComment: ForumComment[]=[];

  newCommentForm = this.fb.group({
    text: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private forumService: ForumService,
    private route: ActivatedRoute,
    private commentService: CommentService
  ) {

  }

  ngOnInit(): void {
    this.getApiSubjectById();
    this.getApiCommentBySubject();
    this.addComment();
  }

  getApiSubjectById(): void {
    this.id = this.route.snapshot.queryParams['id'];
    console.log(this.id);
    this.forumService.getSubjectById(this.id)
      .subscribe((baseResVO: BaseResVO) => {
        this.forumSubject = <ForumSubject[]> baseResVO.data;
      });
  }

  getApiCommentBySubject(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.commentService.getCommentBySubject(this.id)
      .subscribe((baseResVO: BaseResVO) => {
        this.forumComment = <ForumComment[]> baseResVO.data;
        console.log(this.forumComment);
      });
  }

  
  addComment(): void {
    if (this.newCommentForm.valid) {
      const forumComment: ForumComment = {
        subject_id: this.route.snapshot.queryParams['id'],
        text: this.newCommentForm.value.text
      }
       this.commentService.addComment(forumComment).subscribe((data) => {
         this.getApiCommentBySubject();
         this.newCommentForm.setValue({text: null});
         console.log(data);
        });
       // ($('#showMesssage') as any).modal('show');
     }
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteCommentById(commentId).subscribe(data => {
      this.getApiCommentBySubject();
    });
  }
}
