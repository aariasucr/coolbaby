import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { UserService } from '../shared/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { NotificationService } from '../shared/notification.service';
import { ProductData } from '../shared/models';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  userId: string;
  productId: string;
  public producto: ProductData;
  likesUsuario = [];
  nombreProducto = 'cargando';
  precioProducto = 0;
  productoImg = '';
  talla = 'cargando';
  categoria = 0;
  likes = 0;
  propietario = 'cargando';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private userService: UserService,
    private firebaseAuth: AngularFireAuth,
    private firebaseDatabase: AngularFireDatabase,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (!params.has('productId')) {
        this.router.navigate(['/home']);
        return;
      }

      this.firebaseAuth.currentUser.then(userData => {
        if (!!userData && 'uid' in userData && !!userData.uid) {
          this.userId = userData.uid;

          this.productId = params.get('productId');
          this.productService.getProductByProductId(this.productId)
            .then(result => {
              this.producto = result.val() as ProductData;
              this.nombreProducto = this.producto.nombre;
              this.precioProducto = this.producto.precio;
              this.productoImg = this.producto.img;
              this.talla = this.producto.talla;
              this.categoria = this.producto.categoria;
              this.propietario = this.producto.owner;
              this.likes = this.producto.likes;
            });
          this.userService.getLikesByUserId(this.userId)
            .then(result => {
              this.likesUsuario = result.val() as any;
              if(this.likesUsuario){
                this.likesUsuario = Object.values(this.likesUsuario);
              }
            });
        }
      });
    });
  }

  agregarLike(){
    if(!this.likesUsuario){
      this.likesUsuario = [];
      this.likesUsuario.push(this.productId);
      this.userService.cambiarLike(this.userId, this.likesUsuario);
      this.productService.modificarLikes(this.productId, ++this.likes);
    } else {
      if(this.likesUsuario.indexOf(this.productId) <= -1){
        this.likesUsuario.push(this.productId);
        this.userService.cambiarLike(this.userId, this.likesUsuario);
        this.productService.modificarLikes(this.productId, ++this.likes);
      }
    }
  }

  quitarLike(){
    if(this.likesUsuario.indexOf(this.productId) > -1){
      this.likesUsuario.splice(this.likesUsuario.indexOf(this.productId), 1);
      this.userService.cambiarLike(this.userId, this.likesUsuario);
      this.productService.modificarLikes(this.productId, --this.likes);
    }
  }

}
