import { Component, OnInit } from '@angular/core';
import { profile } from "../interfaces/Profile";
import {ProfileService} from "../services/profile.service";
import {ActivatedRoute} from "@angular/router";
import {BaseResVO} from "../interfaces/VO/res/BaseResVO";
import {Enterprise} from "../interfaces/Enterprise";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  myProfile: profile;
  uid: string;
  constructor(private profileService: ProfileService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getApiProfileById();
  }

  getApiProfileById(): void {
    this.uid = "3";                  //A update en fonction de la recuperation de l'ID via la connexion
    console.log(this.uid);
    this.profileService.getProfileById(this.uid)
      .subscribe((baseResVO: BaseResVO) => {
        console.log(baseResVO.data);
        this.myProfile = <profile>baseResVO.data;
      });
  }
}
