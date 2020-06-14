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
  constructor(private userService: UserService) {
    // console.log('why is this first');
    // console.log('isLoggedIn en constructor:', this.isLoggedIn);
    // console.log('userData en constructor:', this.userData);
    // this.userData = {
    //   userName: 'non',
    //   created: 0,
    //   lastUpdate: 0,
    //   email: 'nope',
    //   fullName: 'nope',
    //   img: 'nopeimg'
    // };
    console.log('isuserlooged in en const:', this.userService.isUserLoggedIn());
    this.userService.statusChange.subscribe(userData => {
      if (userData) {
        console.log('deberia estar entrando aca');
        this.userData = userData;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      console.log('userData: ', userData);
      console.log('isLoggedIn: ', this.isLoggedIn);
    });
  }

  ngOnInit() {
    this.userService.statusChange.subscribe(userData => {
      if (userData) {
        console.log('deberia estar entrando aca');
        this.userData = userData;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      console.log('userData: ', userData);
      console.log('isLoggedIn: ', this.isLoggedIn);
    });
  }

  logout() {
    this.userService.performLogout();
  }
}
