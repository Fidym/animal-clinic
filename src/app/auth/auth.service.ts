import { Injectable, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  token: string;
  isAdmin = false;

  authenticated: boolean;
  userLoggedIn = new Subject<boolean>();

  user = firebase.auth().currentUser;
  userId = new Subject<string>();

  isLoading = false;
  redirectUrl: string;

  constructor(private router: Router,
              private _ngZone: NgZone) {}

  ngOnInit() {
  }

  addAdminRole(adminEmail: any) {
    const functions = firebase.functions();
    const adminRole = functions.httpsCallable('addAdminRole');
    adminRole(adminEmail).then(result => {
      console.log(result);
    });
  }

  signUpUser(email: string, password: string) {
    this.isLoading = true;
    // promise-t ad eredményül, így a response-ra lehet listen-elni
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.isLoading = false;
        this.signInUser(email, password);
      })
      .catch(error => {
        this.isLoading = false;
        alert(error.message);
        console.log(error);
      });
  }

  signInUser(email: string, password: string) {
    this.isLoading = true;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.isLoading = false;
        this.authState();
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.isLoading = false;
        console.log(error);
        alert(error.message);
      });
  }

  getUserId() {
    return firebase.auth().currentUser.uid;
  }

  getToken() {
    // getIdToken egy ascyn method, promise-t returnol
    // azért mert nem csak lekéri a token id-d a local storage-bol hanem ellenőrzi is azt
    // ha pedig nem érvényes visszanyul a backendre és újat kér
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token: string) => (this.token = token));
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .catch(error => {
        console.log('Log out error: ' + error);
      });
  }

  authState() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          this.isAdmin = idTokenResult.claims.admin;
        });
        this.getUserId();
        this.getToken();
        this.authenticated = true;
        this.userLoggedIn.next(this.authenticated);
        this.user = user;
        this.userId.next(user.uid);
        if (this.redirectUrl) {
          this._ngZone.run(() => {this.router.navigateByUrl(this.redirectUrl); });
          this.redirectUrl = null;
        }
        console.log('user logged in');
      } else {
        this.isAdmin = false;
        this.authenticated = false;
        this.userLoggedIn.next(this.authenticated);
        this.user = null;
        this.userId.next(null);
        this.router.navigate(['/sign-in']);
        console.log('user logged out');
      }
    });
  }
}
