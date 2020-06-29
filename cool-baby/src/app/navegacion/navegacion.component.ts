import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  constructor(private userService: UserService, private firebaseDB: AngularFireDatabase) {}

  categorias: string;
  mostrarOpcionesCatalogo = false;
  categoriaSeleccionada: string;

  ngOnInit() {
    this.cargarCategorias();
  }

  logout() {
    this.userService.performLogout();
  }

  cargarCategorias() {
    this.firebaseDB.database
      .ref('categories')
      .child('/')
      .once('value')
      .then(result => {
        this.categorias = result.val();
      });
  }

  toggleCatalogoNav() {
    this.mostrarOpcionesCatalogo = !this.mostrarOpcionesCatalogo;
  }
}
