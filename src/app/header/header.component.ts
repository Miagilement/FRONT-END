import {Component, OnInit} from '@angular/core';
import {BaseResVO} from '../interfaces/VO/res/BaseResVO';
import {Individual} from '../interfaces/Individual';
import {IndividualService} from '../services/individual.service';
import {TokenStorageService} from '../services/token-storage.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  myProfile: Individual;
  uid: string;

  cheminLogo: any = '../assets/logo.png';

  constructor(private profileService: IndividualService, private tokenStorageService: TokenStorageService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.getApiProfileById();
  }

  goLogout(): void{
    this.auth.logout().subscribe((baseResVO: BaseResVO) => {
      console.log(baseResVO.message);
      this.tokenStorageService.removeAll();
    });
    this.ngOnInit();
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
