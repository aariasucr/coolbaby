import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ProductData, TentativeProduct} from '../shared/models';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../shared/product.service';
import {UserService} from '../shared/user.service';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  constructor(
    private firebaseDB: AngularFireDatabase,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}
  private todo = 3;
  public todosProductos: ProductData[] = [];
  public indiceProducto: number;
  public productoActual: ProductData;
  public productosActuales: ProductData[] = [];
  likesUsuario = [];
  userId: string;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (!params.has('categoria')) {
        this.router.navigate(['/home']);
        return;
      }
      let paramCat = parseInt(params.get('categoria'));
      this.indiceProducto = 0;
      this.cargarProductos(paramCat);
      this.userService.getCurrentUser()
        .then(result => {
          this.userId = result.uid;
        });
      this.userService.getLikesByUserId(this.userId)
        .then(result => {
          this.likesUsuario = result.val() as any;
          if(this.likesUsuario){
            this.likesUsuario = Object.values(this.likesUsuario);
          }
        });
    });
  }

  cargarProductos(categoria: number) {
    let _this = this;
    this.firebaseDB
      .list(`products`)
      .snapshotChanges()
      .subscribe(productos => {
        productos.map(prod => {
          this.todosProductos.push(prod.payload.val() as ProductData);
          this.todosProductos[this.todosProductos.length - 1].key = prod.key;

          // prodPorUsuario.forEach((element, contador) => {
          //   this.todosProductos[contador].key = element.key;
          // });
          _this.productosPorCategoria(categoria);
          _this.productoActual = this.productosActuales[this.indiceProducto];
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
    if (this.productosActuales.length - 1 == this.indiceProducto) {
      this.indiceProducto = 0;
    } else {
      this.indiceProducto++;
    }
    this.productoActual = this.productosActuales[this.indiceProducto];
  }

  getCategoria(categoria: number) {
    switch (categoria) {
      case 0:
        return 'Pantalones';
      case 1:
        return 'Jackets';
      case 2:
        return 'Pijamas';
      case 3:
        return 'Todo';
      default:
        //this.notificationService.showErrorMessage("Error al mostrar la categoría", "No existe una categoría asociada a este artículo");
        return 'Sin categoría';
    }
  }

  intentarComprar() {
    this.userService
      .getCurrentUser()
      .then(authData => {
        this.userService.getUserDataFromFirebase(authData.uid).then(userData => {
          let userDataVal = userData.val();
          this.productService.getProductByProductId(this.productoActual.key).then(product => {
            this.userService.getUserDataFromFirebase(product.val().ownerId).then(owner => {
              let tentativeBuy = {
                nombreComprador: userDataVal.userName,
                uidComprador: userData.key,
                nombreProducto: this.productoActual.nombre,
                uidProducto: this.productoActual.key,
                uidVendedor: owner.key,
                emailVendedor: owner.val().email,
                img: this.productoActual.img,
                nombreVendedor: owner.val().userName
              } as TentativeProduct;
              this.productService
                .addTentativeBuy(tentativeBuy, this.productoActual.ownerId)
                .then(results => {
                  this.notificationService.showSuccessMessage(
                    'Transacción exitosa',
                    'Producto expuesto a venta'
                  );
                })
                .catch(error => {
                  this.notificationService.showErrorMessage(
                    'Error!!!',
                    'Se ha producido el siguiente error al exponer producto a venta: ' +
                      error.message
                  );
                  console.log(error.message);
                });
            });
          });
        });
      })
      .catch(err => {
        this.notificationService.showErrorMessage('Error', err.message);
      });
  }

  agregarLike(){
    if(!this.likesUsuario){
      this.likesUsuario = [];
      this.likesUsuario.push(this.productoActual.key);
      this.userService.cambiarLike(this.userId, this.likesUsuario);
      this.productService.modificarLikes(this.productoActual.key, this.productoActual.likes + 1);
      this.productoActual.likes++;
    } else {
      if(this.likesUsuario.indexOf(this.productoActual.key) <= -1){
        this.likesUsuario.push(this.productoActual.key);
        this.userService.cambiarLike(this.userId, this.likesUsuario);
        this.productService.modificarLikes(this.productoActual.key, this.productoActual.likes + 1);
        this.productoActual.likes++;
      }
    }
  }

  quitarLike(){
    if(this.likesUsuario.indexOf(this.productoActual.key) > -1){
      this.likesUsuario.splice(this.likesUsuario.indexOf(this.productoActual.key), 1);
      this.userService.cambiarLike(this.userId, this.likesUsuario);
      this.productService.modificarLikes(this.productoActual.key, this.productoActual.likes - 1);
      this.productoActual.likes--;
    }
  }
}
