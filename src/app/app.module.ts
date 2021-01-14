import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { InscriptionProfilComponent } from './inscriptions/inscription-profil/inscription-profil.component';
import { InscriptionEntComponent } from './inscriptions/inscription-ent/inscription-ent.component';
import { CompanySheetComponent } from './companySheets/company-sheet/company-sheet.component';
import { AllCompanySheetComponent } from './companySheets/all-company-sheet/all-company-sheet.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InscriptionProfilComponent,
    InscriptionEntComponent,
    CompanySheetComponent,
    AllCompanySheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
