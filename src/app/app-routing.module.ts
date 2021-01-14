import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InscriptionEntComponent } from './inscriptions/inscription-ent/inscription-ent.component';
import { InscriptionProfilComponent } from './inscriptions/inscription-profil/inscription-profil.component';
import {CompanySheetComponent} from "./companySheets/company-sheet/company-sheet.component";
import {AllCompanySheetComponent} from "./companySheets/all-company-sheet/all-company-sheet.component";

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'inscriptionEnt', component:InscriptionEntComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'companySheet', component:CompanySheetComponent},
  {path:'allCompanySheet', component:AllCompanySheetComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
