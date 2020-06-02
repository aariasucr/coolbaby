import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {AngularFireAuth} from '@angular/fire/auth';

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
    private userService: UserService
  ) {}

  ngOnInit() {
    // Esto probablemente se va despues de que tengamos la pagina de inicio
    /*this.userService.statusChange.subscribe(userData => {
      if (userData) {
        this.userData = userData;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });*/
  }

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
      })
      .catch(error => {
        //Algun tipo de notificacion
        console.log('Error en la autenticacion:', error.message);
      });
  }

  AnonimousLogin() {
    this.firebaseAuth.signInAnonymously().then(userData => {
      this.userService.performAnonimousLogin(/*userData.user.uid*/);
      this.router.navigate(['/home']);
    });
  }
}
