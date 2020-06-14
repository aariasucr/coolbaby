import {Component, OnInit} from '@angular/core';
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
  constructor(private userService: UserService) {}

  ngOnInit() {
    if (!this.userData) {
      this.userData = {
        userName: '',
        created: 0,
        lastUpdate: 0,
        email: '',
        fullName: '',
        img: ''
      };
    }
    this.userService.statusChange.subscribe(userData => {
      console.log('Status change:', userData);
      if (userData) {
        console.log('There was actually user data');
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
