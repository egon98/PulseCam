import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./auth/auth.guard";
import {SidenavListComponent} from "./navigation/sidenav-list/sidenav-list.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {HomeComponent} from "./home/home.component";
import {EmailverificationComponent} from "./emailverification/emailverification.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {ProfileComponent} from "./profile/profile.component";
import {AddpatientComponent} from "./addpatient/addpatient.component";
import {PatientsComponent} from "./patients/patients.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent},
  { path: 'emailverification', component: EmailverificationComponent},
  { path: 'passwordreset', component: PasswordResetComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'addpatient', component: AddpatientComponent},
  { path: 'patients', component: PatientsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }


