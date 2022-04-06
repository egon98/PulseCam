import {Injectable, NgZone} from "@angular/core";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

import {User} from "./user.model";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

import firebase from "firebase/compat/app";
import auth = firebase.auth;

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  authChange = new Subject<boolean>();
  private user: User;
  userData: any;

  constructor(public angularFireStore: AngularFirestore,
              public angularFireAuth: AngularFireAuth,
              private router: Router,
              public ngZone: NgZone) {
    // A felhasználó adatainak lementése localStorage-ba amikor be van lépve és null-ra állítása amikor kijelentkezik
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  SignIn(email, password) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home'])
        });
        this.SetUserData(result.user);
      }).catch(() => {
        window.alert("Email or password not valid")
      })
  }

  SignUp(email, password) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationEmail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  SendVerificationEmail() {
    if(this.isAuth) {
      return firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          this.router.navigate(['emailverification'])
        })
    }
  }

  ResetPassword(resetPass) {
    return this.angularFireAuth.sendPasswordResetEmail(resetPass)
      .then(() => {
        window.alert('Email sent with the link to reset password.')
      }).catch((error) => {
        window.alert(error)
      })
  }

  get isLoggedInAndEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false)
  }

  AuthWithGoogle() {
    return this.AuthProvider(new auth.GoogleAuthProvider())
  }

  AuthWithFacebook() {
    return this.AuthProvider(new auth.FacebookAuthProvider())
  }

  AuthProvider(provider) {
    return this.angularFireAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home'])
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(`users/${user.uid}`)
    const userData: User = {
      userId: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  LogOut() {
    return this.angularFireAuth.signOut().then(() => {
      this.userData = null;
      localStorage.removeItem('user');
      this.router.navigate(['signup'])
    })
  }


  isAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false);
    return user.userId !== null;
  }


 /* registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 100000).toString()
    };
    this.authChange.next(true)
    this.router.navigate(['/signup']);
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
  }*/

  getUser() {
    return { ...this.user}
  }

  /*isAuth() {
    return this.user.email != null;
   // return this.user != null;
  }*/




}
