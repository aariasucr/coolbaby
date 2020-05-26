import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {UserData} from '../shared/models';

import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: UserData;
  isLoggedIn: boolean;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.statusChange.subscribe(userData => {
      if (userData) {
        this.userData = userData;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    const email = form.value.userName;
    const password = form.value.password;
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(userData => {
        this.userService.performLogin(userData.user.uid);
        this.router.navigate(['/login']);
      })
      .catch(error => {
        //Algun tipo de notificacion
        console.log('Error en la autenticacion:', error);
      });
  }
}