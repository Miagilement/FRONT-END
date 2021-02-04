import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {InscriptionEntComponent} from './inscriptions/inscription-ent/inscription-ent.component';
import {CompanySheetComponent} from './companySheets/company-sheet/company-sheet.component';
import {AllCompanySheetComponent} from './companySheets/all-company-sheet/all-company-sheet.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ConnexionComponent} from './connexion/connexion.component';
import {ForumHomeComponent} from './forum/forum-home/forum-home.component';
import {ForumDetailsComponent} from './forum/forum-details/forum-details.component';
import {ForumNewComponent} from './forum/forum-new/forum-new.component';
import {UserProfileComponent} from './user-profile/user-profile.component';

import {AngularEditorModule} from '@kolkov/angular-editor';
import { InscriptionIndividualComponent } from './inscriptions/inscription-individual/inscription-individual.component';
import { TermsComponent } from './terms/terms.component';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InscriptionEntComponent,
    CompanySheetComponent,
    AllCompanySheetComponent,
    ConnexionComponent,
    ForumHomeComponent,
    ForumDetailsComponent,
    ForumNewComponent,
    UserProfileComponent,
    InscriptionIndividualComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    AngularEditorModule,

    RecaptchaModule,  //C'est l'entrée principale du module recaptcha 
    RecaptchaFormsModule, //C’est le module pour la validation de formulaire incase
  ],
  entryComponents:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
