import {Component, OnInit} from '@angular/core';

import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {RegisterData} from '../shared/models';

import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const fullName = form.value.fullName;
    const userName = form.value.userName;

    var newUser = {
      email: email,
      password: password
    };

    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        let datosDeRegistro: RegisterData = {
          created: 0,
          lastUpdate: 0,
          email: email,
          userName: userName,
          fullName: fullName
        };
        this.userService.addRegisterData(datosDeRegistro, result.user.uid);
        this.router.navigate(['./home']);
        this.notificationService.showSuccessMessage(
          'Registro completo',
          'Se ha creado el usuario correctamente'
        );
      })
      .catch(error => {
        this.notificationService.showErrorMessage('Error al registrarse', error.message);
      });
  }
}
