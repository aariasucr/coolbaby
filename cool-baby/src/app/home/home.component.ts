import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {ConfigService} from '../shared/config.service';
import {NotificationService} from '../shared/notification.service';
//import {UserData} from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageTitle = '';
  //userData: UserData;

  constructor(
    //private firebaseDatabase: AngularFireDatabase,
    //private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private notificationService: NotificationService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.configService.getConfig('isAwesomeFeatureEnabled').then(value => {
      if (!!value) {
        this.pageTitle = 'Inicio';
      } else {
        this.pageTitle = 'Mi Perfil';
      }
    });
  }

  logout() {
    this.userService.performLogout();
    this.notificationService.showSuccessMessage(
      'Sesión finalizada',
      'La sesión se ha cerrado correctamente'
    );
  }
}
