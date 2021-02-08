import {Component, OnInit} from '@angular/core';
import {BaseResVO} from '../interfaces/VO/res/BaseResVO';
import {Individual} from '../interfaces/Individual';
import {IndividualService} from '../services/individual.service';
import {TokenStorageService} from '../services/token-storage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  myProfile: Individual;
  uid: string;
  identifiedStatus: boolean;
  username: string;

  cheminLogo: any = '../assets/logo.png';

  constructor(private profileService: IndividualService, private tokenStorageService: TokenStorageService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getApiProfileById();
  }

  checkIdentified(): boolean {
    this.uid = this.tokenStorageService.getUid();
    console.log(this.uid);
    if (this.uid == null) {
      return true;
    } else {
      return false;
    }
    console.log(this.identifiedStatus);
  }

  checkNotIdentified(): boolean {
    this.uid = this.tokenStorageService.getUid();
    console.log(this.uid);
    if (this.uid == null) {
      return false;
    } else {
      return true;
    }
    console.log(this.identifiedStatus);
  }

  getApiProfileById(): void {
    this.uid = this.tokenStorageService.getUid();
    console.log(this.uid);
    this.profileService.getIndividualById(this.uid)
      .subscribe((baseResVO: BaseResVO) => {
        console.log(baseResVO.data);
        this.myProfile = <Individual> baseResVO.data;
      });
  }
}
