import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-mod-header',
  templateUrl: './mod-header.component.html',
  styleUrls: ['./mod-header.component.css']
})
export class ModHeaderComponent implements OnInit {
  versionInfo = null;
  loggedIn: boolean = false;
  userName: string = 'Login';

  constructor(
    private router: Router) { }

  ngOnInit() {
    //this.authService.getLoggedInName.subscribe(user => this.userName = user);
    /*if (this.authService.isUserLoggedIn()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }*/

  }

  logout() {
   // this.authService.logoutUser();

  }

  getLoggedInStatus() {
    
  }

}
