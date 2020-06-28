import {Component, OnInit, ChangeDetectorRef, Renderer2, Inject} from '@angular/core';
import {UserService} from '../shared/user.service';
import {UserData} from '../shared/models';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  showUserName = false;
  userData: UserData;
  hideMenu = true;
  constructor(
    private userService: UserService,
    private changeDetector: ChangeDetectorRef,
    private rend: Renderer2,
    @Inject(DOCUMENT) private document
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

  toggleMenu(){
    if(!this.hideMenu) {
      this.rend.removeClass(document.body, 'sidebar-icon-only');
      this.rend.removeClass(document.getElementById('sidebar'), 'active');
      this.hideMenu = true;
    } else {
      this.rend.addClass(document.body, 'sidebar-icon-only');
      this.rend.addClass(document.getElementById('sidebar'), 'active');
      this.hideMenu = false;
    }
  }
}
