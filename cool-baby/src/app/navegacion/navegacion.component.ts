//import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Categoria} from '../shared/models';
import {RouteGuard} from '../shared/route-guard';
@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  constructor(
    private userService: UserService,
    private firebaseDB: AngularFireDatabase,
    private routeGuard: RouteGuard //private changeDetector: ChangeDetectorRef
  ) {}
  categorias: Categoria;
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
      .once('value')
      .then(result => {
        console.log('Que hay en result:', result);
        this.categorias = result.val();
        console.log('Categorias:', this.categorias);
        //this.changeDetector.detectChanges();
      });
  }

  toggleCatalogoNav() {
    this.mostrarOpcionesCatalogo = !this.mostrarOpcionesCatalogo;
  }
}
