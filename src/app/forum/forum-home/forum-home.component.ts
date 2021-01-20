import { Component, OnInit } from '@angular/core';
import {ForumSubjects} from "../../interfaces/ForumSubjects";
import {ForumService} from 'src/app/services/forum.service';
import {FormBuilder} from "@angular/forms";
import {BaseResVO} from "../../interfaces/VO/res/BaseResVO";

@Component({
  selector: 'app-forum-acceuil',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.css']
})
export class ForumHomeComponent implements OnInit {

  forumSubjects : ForumSubjects[]=[];
  constructor(
    private forumService : ForumService
  ) { }

  ngOnInit(): void {
    this.getApiForumSubjects();
  }

  getApiForumSubjects():void{
    this.forumService.getForumSubjects()
      .subscribe((baseResVO : BaseResVO)=>{
        console.log(baseResVO.data);
        this.forumSubjects = <ForumSubjects[]>baseResVO.data;
      });
  }
}
