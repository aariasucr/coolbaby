import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Producto} from '../shared/models';
import {CatalogoService} from '../shared/catalogo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  constructor(
    private firebaseDB: AngularFireDatabase,
    private changeDetector: ChangeDetectorRef,
    private catalogoService: CatalogoService
  ) {}
  public todosProductos: Producto[] = [];
  public indiceProducto: number;
  public productoActual: Producto;
  public productosActuales: Producto[] = [];
  public;
  ngOnInit() {
    this.cargarProductos();
    this.indiceProducto = 0;
    this.catalogoService.catalogoSeleccionado.subscribe(categoria => {});
  }

  cargarProductos() {
    let _this = this;
    this.firebaseDB
      .list(`products`)
      .snapshotChanges()
      .subscribe(data => {
        data.map(e => {
          this.firebaseDB
            .list(`products/${e.key}`, ref => ref.limitToLast(100))
            .snapshotChanges()
            .subscribe(data => {
              this.todosProductos = data.map(e => {
                return {
                  ...(e.payload.val() as Producto)
                };
              });
            });
        });
      });
  }

  productosPorCategoria(categoria: number) {
    this.productosActuales = this.todosProductos.filter(prod => {
      return prod.categoria == categoria;
    });
  }

  siguienteImagen() {
    if (this.todosProductos.length - 1 == this.indiceProducto) {
      this.indiceProducto = 0;
    } else {
      this.indiceProducto++;
    }
    this.productoActual = this.todosProductos[this.indiceProducto];
  }

  // cargarCategorias() {
  //   this.firebaseDB.database
  //     .ref('categories')
  //     .once('value')
  //     .then(result => {
  //       this.categorias = result.val();
  //       console.log('Categorias:', this.categorias);
  //       this.changeDetector.detectChanges();
  //     });
  // }
}
