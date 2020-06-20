import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ProductData} from '../shared/models';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  constructor(
    private firebaseDB: AngularFireDatabase,
    private changeDetector: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  private todo = 3;
  public todosProductos: ProductData[] = [];
  public indiceProducto: number;
  public productoActual: ProductData;
  public productosActuales: ProductData[] = [];
  public;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      if (!params.has('categoria')) {
        this.router.navigate(['/home']);
        return;
      }
      let paramCat = parseInt(params.get('categoria'));
      this.indiceProducto = 0;
      this.cargarProductos(paramCat);
    });
  }

  cargarProductos(categoria: number) {
    let _this = this;
    this.firebaseDB
      .list(`products`)
      .snapshotChanges()
      .subscribe(data => {
        data.map(e => {
          this.firebaseDB
            .list(`products/${e.key}`, ref => ref.limitToLast(100).orderByChild('nombre'))
            .snapshotChanges()
            .subscribe(data => {
              let productosPorUsuario = data.map(e => {
                return {
                  ...(e.payload.val() as ProductData)
                };
              });

              this.todosProductos.push(...productosPorUsuario);
              data.forEach((element, contador) => {
                this.todosProductos[contador].key = element.key;
              });
              _this.productosPorCategoria(categoria);
              _this.productoActual = this.productosActuales[this.indiceProducto];
            });
        });
      });
  }

  productosPorCategoria(categoria: number) {
    if (categoria != this.todo) {
      this.productosActuales = this.todosProductos.filter(prod => {
        return prod.categoria == categoria;
      });
    } else {
      this.productosActuales = this.todosProductos;
    }
  }

  siguienteImagen() {
    // console.log('Cuantos productos actuales hay?:', this.productosActuales.length);
    // console.log('indice:', this.indiceProducto);
    // console.log('todos los productos actuales:', this.productosActuales);
    // console.log('todos los productos:', this.todosProductos);
    if (this.productosActuales.length - 1 == this.indiceProducto) {
      this.indiceProducto = 0;
    } else {
      this.indiceProducto++;
    }
    this.productoActual = this.productosActuales[this.indiceProducto];
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
