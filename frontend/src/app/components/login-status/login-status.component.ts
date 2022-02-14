import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean;
  userFullName: string;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {

    // subscribe to the  authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );

  }

  getUserDetails() {

    if (this.isAuthenticated) {
      this.oktaAuthService.getUser().then(
        res => {
          this.userFullName = res.name;
          // retrieve email address
          const email = res.email;
          sessionStorage.setItem('userEmail', JSON.stringify(email));
        }
      );
    }
  }

  logout() {
    this.oktaAuthService.signOut();

  }

}
