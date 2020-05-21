import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cool-baby';

  constructor(private firebaseAuth: AngularFireAuth) {}

  ngOnInit(): void {
    // Revise en firebase si el usuario cambio su estado de autenticacion
    // paso de logout a logged in o inverso
    // Aca va parte de la logica del login (al menos el llamado). Por eso la parte de AngularFireAuth
  }
}
