import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  constructor(
    private userService: UserService,
    private firebaseDB: AngularFireDatabase,
    private changeDetector: ChangeDetectorRef
  ) {}
  categorias: any;
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
        this.categorias = result.val();
        console.log('Categorias:', this.categorias);
        this.changeDetector.detectChanges();
      });
  }

  irCatalogo() {
    //this.router.navigate(['/catalogo']);
  }

  toggleCatalogoNav() {
    console.log('aaa');
    this.mostrarOpcionesCatalogo = !this.mostrarOpcionesCatalogo;
  }
}
