import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import { SidenavListComponent} from "./navigation/sidenav-list/sidenav-list.component";
import { HeaderComponent } from './navigation/header/header.component';
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "./auth/auth.service";
import {MatInput} from "@angular/material/input";
import { WelcomeComponent } from './welcome/welcome.component';
import {FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig} from "angularx-social-login";
import { HomeComponent } from './home/home.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { EmailverificationComponent } from './emailverification/emailverification.component';
import {FirebaseAppModule} from "@angular/fire/app";
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ProfileComponent } from './profile/profile.component';
import { AddpatientComponent } from './addpatient/addpatient.component';
import {MatSelectCountryModule} from "@angular-material-extensions/select-country";
import {HttpClientModule} from "@angular/common/http";
import { PatientsComponent } from './patients/patients.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {DataTablesModule} from "angular-datatables";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SidenavListComponent,
    HeaderComponent,
    WelcomeComponent,
    HomeComponent,
    EmailverificationComponent,
    PasswordResetComponent,
    ProfileComponent,
    AddpatientComponent,
    PatientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    FlexLayoutModule,
    SocialLoginModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatSelectCountryModule.forRoot('en'),
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DataTablesModule
  ],
  exports: [
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatFormFieldModule,
    FirebaseAppModule,

  ],
  providers: [AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '257241486190003'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class AppModule {

}
