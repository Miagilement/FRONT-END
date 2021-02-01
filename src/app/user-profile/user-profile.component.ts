import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Individual } from '../interfaces/Individual';
import {BaseResVO} from '../interfaces/VO/res/BaseResVO';
import { IndividualService } from '../services/individual.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  myProfile: Individual;
  uid: string;

  constructor(private profileService: IndividualService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getApiProfileById();
  }

  getApiProfileById(): void {
    this.uid = '1';                  //A update en fonction de la recuperation de l'ID via la connexion
    console.log(this.uid);
    this.profileService.getIndividualById(this.uid)
      .subscribe((baseResVO: BaseResVO) => {
        console.log(baseResVO.data);
        this.myProfile = <Individual> baseResVO.data;
      });
  }
}
