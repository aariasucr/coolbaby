import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {ConfigService} from '../shared/config.service';
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
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.configService.getConfig('isAwesomeFeatureEnabled').then(value => {
      console.log('isAwesomeFeatureEnabled: ' + value);
      if (!!value) {
        this.pageTitle = 'Inicio';
      } else {
        this.pageTitle = 'Mi Perfil';
      }
    });

    /*this.userService.statusChange.subscribe(userData =>{
      console.log('userData', this.userData);
      if(userData) {
        this.userData = userData;
      }
    });*/

    /*this.firebaseAuth.currentUser.then(userData => {
      // console.log('userData en el componente', userData);
      if(!!userData && 'uid' in userData && !!userData.uid) {

        this.firebaseDatabase
          .list(`posts/${this.author}`, ref => ref.limitToLast(100).orderByChild('created'))
          .snapshotChanges()
          .subscribe(data => {
            console.log(data);
            this.posts = data.map(e => {
              return {
                ...(e.payload.val() as PostData)
              };
            });
          });
      }
    });*/

    /*this.userService.statusChange.subscribe(userData => {
      if (userData) {
        this.userData = userData;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });*/
  }

  logout() {
    this.userService.performLogout();
  }
}
