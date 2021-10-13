import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {AuthData} from "./auth.data.model";
import {User} from "./user.model";

@Injectable()
export class AuthService{
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 100000).toString()
    };
    this.authChange.next(true)
    this.router.navigate(['/login']);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 100000).toString()
    }
    this.authChange.next(true);
    this.router.navigate(['/home'])
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/'])
  }

  getUser() {
    return { ...this.user}
  }

  isAuth() {
    return this.user != null;
  }


}
