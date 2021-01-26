import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {InscriptionEntComponent} from './inscriptions/inscription-ent/inscription-ent.component';
import {InscriptionProfileComponent} from './inscriptions/inscription-profile/inscription-profile.component';
import {CompanySheetComponent} from './companySheets/company-sheet/company-sheet.component';
import {AllCompanySheetComponent} from './companySheets/all-company-sheet/all-company-sheet.component';
import {ForumHomeComponent} from './forum/forum-home/forum-home.component';
import {ForumDetailsComponent} from './forum/forum-details/forum-details.component';
import {ForumNewComponent} from './forum/forum-new/forum-new.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {UserProfileComponent} from './user-profile/user-profile.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'inscriptionEnt', component: InscriptionEntComponent},
  {path: 'inscriptionProf', component: InscriptionProfileComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'companySheet', component: CompanySheetComponent},
  {path: 'allCompanySheet', component: AllCompanySheetComponent},
  {path: 'forum', component: ForumHomeComponent},
  {path: 'forumDetails', component: ForumDetailsComponent},
  {path: 'forumNew', component: ForumNewComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: '**', redirectTo: 'home'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
