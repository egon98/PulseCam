import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSub: Subscription;
  socialAuthService: SocialAuthService;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSub = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  logout() {
    this.authService.logout();
    this.socialAuthService.signOut();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
