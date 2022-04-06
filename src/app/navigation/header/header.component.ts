import {Component, EventEmitter, OnInit, Output, OnDestroy, Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {LoginComponent} from "../../auth/login/login.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSub: Subscription;
  socialAuthService: SocialAuthService;
  socialUser: SocialUser;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authSub = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
    });
  }

  logout() {
    this.authService.LogOut();
    this.socialAuthService.signOut();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
