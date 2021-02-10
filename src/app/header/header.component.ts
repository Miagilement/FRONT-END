import {Component, Input, OnInit} from '@angular/core';
import {BaseResVO} from '../interfaces/VO/res/BaseResVO';
import {Individual} from '../interfaces/Individual';
import {IndividualService} from '../services/individual.service';
import {TokenStorageService} from '../services/token-storage.service';
import {AuthService} from '../services/auth.service';
import {DataSharingService} from '../services/data-sharing.service';
import { Observable, Subject } from 'rxjs';
import { ForumService } from '../services/forum.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   //search implement
   @Input()baseResVO$ : Observable<BaseResVO[]>;
   private searchTerms = new Subject<string>();

  userName : string;
  uid: string;
  isUserLoggedIn: boolean;

  cheminLogo: any = '../assets/logo.png';

  constructor(
    private profileService: IndividualService, 
    private tokenStorageService: TokenStorageService, 
    private auth: AuthService, 
    private dataSharingService: DataSharingService,
    private forumService: ForumService ) 
    {
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
    this.baseResVO$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((title: string) => this.forumService.searchSubjectByName(title)),
    );
  }
  search(title:string):void{
    this.searchTerms.next(title);
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
