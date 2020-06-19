import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /*userData: UserData;
  isLoggedIn: boolean;*/

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
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(userData => {
        this.userService.performLogin(userData.user.uid);
        //Este navigate debe ir a la pagina de inicio
        /*this.router.navigate(['/login']);*/
        this.router.navigate(['/home']);
        this.notificationService.showSuccessMessage(
          'Bienvenido a Cool Baby',
          'Ha iniciado sesión exitosamente'
        );
      })
      .catch(error => {
        this.notificationService.showErrorMessage('Error en la autenticación', error.message);
      });
  }

  AnonimousLogin() {
    this.firebaseAuth.signInAnonymously().then(userData => {
      this.userService.performAnonimousLogin(/*userData.user.uid*/);
      this.router.navigate(['/home']);
    });
  }
}
