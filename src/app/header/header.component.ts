import {Component, OnInit} from '@angular/core';
import {BaseResVO} from '../interfaces/VO/res/BaseResVO';
import {Individual} from '../interfaces/Individual';
import {IndividualService} from '../services/individual.service';
import {TokenStorageService} from '../services/token-storage.service';
import {AuthService} from '../services/auth.service';
import {DataSharingService} from '../services/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName : string;
  uid: string;
  isUserLoggedIn: boolean;

  cheminLogo: any = '../assets/logo.png';

  constructor(private profileService: IndividualService, private tokenStorageService: TokenStorageService, private auth: AuthService, private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.profileService.getIndividualById(this.tokenStorageService.getUid()).subscribe( baseResVO=> {
          let myProfile:Individual = <Individual> baseResVO.data;
          this.userName = myProfile.userName;
        }
      );
      console.log(value);
      this.isUserLoggedIn = value;
    })
  }

  ngOnInit(): void {
  }

  goLogout(): void{
    this.auth.logout().subscribe((baseResVO: BaseResVO) => {
      console.log(baseResVO.message);
      this.tokenStorageService.removeAll();
      this.dataSharingService.isUserLoggedIn.next(false);
    });
    this.ngOnInit();
  }

  // getApiProfileById(): void {
  //   this.uid = this.tokenStorageService.getUid();
  //   console.log(this.uid);
  //   this.profileService.getIndividualById(this.uid)
  //     .subscribe((baseResVO: BaseResVO) => {
  //       console.log(baseResVO.data);
  //       this.myProfile = <Individual> baseResVO.data;
  //     });
  // }
}
