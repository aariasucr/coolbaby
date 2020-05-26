import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cool-baby';

  constructor(private firebaseAuth: AngularFireAuth, private userService: UserService) {}

  ngOnInit(): void {
    // Revise en firebase si el usuario cambio su estado de autenticacion
    // paso de logout a logged in o inverso
    this.firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.userService.performLogin(user.uid);
      } else {
        this.userService.performLogout();
      }
    });
  }
}
