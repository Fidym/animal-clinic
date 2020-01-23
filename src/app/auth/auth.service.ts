
import { Injectable, OnInit } from '@angular/core';
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

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.authState();
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
        this.router.navigate(['/']);
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
        this.getToken();
        this.authenticated = true;
        this.userLoggedIn.next(this.authenticated);
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
    firebase.auth().signOut();
    this.token = null;
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
        console.log('user logged in: ', this.user.email);
      } else {
        this.isAdmin = false;
        this.authenticated = false;
        this.userLoggedIn.next(this.authenticated);
        this.user = null;
        this.userId.next(user.uid);
        console.log('user logged out');
      }
    });
  }
}
