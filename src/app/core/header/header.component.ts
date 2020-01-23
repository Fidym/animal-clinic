import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscriptionUser: Subscription;
  userLoggedIn = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.subscriptionUser = this.authService.userLoggedIn.subscribe(
      userLoggedIn => this.userLoggedIn = userLoggedIn
    );
  }

  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
  }

}
