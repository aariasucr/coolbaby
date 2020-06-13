import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import {UserData} from '../shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userData: UserData;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.statusChange.subscribe(userData => {
      console.log('userData: ', userData);
      console.log('isLoggedIn: ', this.isLoggedIn);
      if (userData) {
        this.userData = userData;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.userService.performLogout();
  }

}
