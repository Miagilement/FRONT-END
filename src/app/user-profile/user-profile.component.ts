import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { UserNormal } from '../interfaces/user-normal';
import {BaseResVO} from '../interfaces/VO/res/BaseResVO';
import { UserNormalService } from '../services/user-normal.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  myProfile: UserNormal;
  uid: string;

  constructor(private profileService: UserNormalService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getApiProfileById();
  }

  getApiProfileById(): void {
    this.uid = '1';                  //A update en fonction de la recuperation de l'ID via la connexion
    console.log(this.uid);
    this.profileService.getProfileById(this.uid)
      .subscribe((baseResVO: BaseResVO) => {
        console.log(baseResVO.data);
        this.myProfile = <UserNormal> baseResVO.data;
      });
  }
}
