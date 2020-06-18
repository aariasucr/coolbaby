import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Producto} from '../shared/models';
import {ElementSchemaRegistry} from '@angular/compiler';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  constructor(
    private userService: UserService,
    private firebaseDB: AngularFireDatabase,
    private changeDetector: ChangeDetectorRef
  ) {}
  public productos: Producto[] = [];
  public indiceProducto: number;
  public productoActual: Producto;
  ngOnInit() {
    this.cargarImagenes();
    this.indiceProducto = 0;
  }

  cargarImagenes() {
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
              this.productos = data.map(e => {
                return {
                  ...(e.payload.val() as Producto)
                };
              });
              this.productoActual = this.productos[this.indiceProducto];
              console.log('merda:', this.productos);
              //this.changeDetector.detectChanges();
            });
        });
      });
  }

  cargarImagenesPorCategoria() {}
}
