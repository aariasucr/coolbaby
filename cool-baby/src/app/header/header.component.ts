import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {UserService} from '../shared/user.service';
import {UserData} from '../shared/models';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  showUserName = false;
  userData: UserData;
  constructor(
    private userService: UserService,
    private firebaseAuth: AngularFireAuth,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userService.statusChange.subscribe(userData => {
      if (userData) {
        this.userData = userData;
        this.isLoggedIn = true;
        this.showUserName = true;
      } else {
        this.isLoggedIn = false;
        this.showUserName = false;
      }
      if (!this.changeDetector['destroyed']) {
        this.changeDetector.detectChanges();
      }
    });
  }

  logout() {
    this.userService.performLogout();
  }
}
