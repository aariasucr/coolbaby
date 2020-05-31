import {Component, OnInit} from '@angular/core';

import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {RegisterData} from '../shared/models';

import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    //Esto probablemente se va despues de que tengamos la pagina de inicio
    // this.userService.statusChange.subscribe(userData => {
    //   if (userData) {
    //     // this.userData = userData;
    //     // this.isLoggedIn = true;
    //   } else {
    //     // this.isLoggedIn = false;
    //   }
    // });
  }

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
        console.log('Agregado a auth:', result);
        let datosDeRegistro: RegisterData = {
          created: 0,
          lastUpdate: 0,
          userName: userName,
          fullName: fullName
        };
        this.userService.addRegisterData(datosDeRegistro, result.user.uid);
        //Este navigate debe ir a la pagina de inicio
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log('Error al agregar a auth:', error);
      });
  }
}
