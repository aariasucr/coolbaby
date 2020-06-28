import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {NotificationService} from '../shared/notification.service';
import {ProductService} from '../shared/product.service';
import {ProductData} from '../shared/models';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: ProductData[] = [];
  uploadedFileUrl = '';
  talla = 'XS';
  categoria = 0;
  ownerId = '';

  constructor(
    private userService: UserService,
    private firebaseAuth: AngularFireAuth,
    private firebaseDatabase: AngularFireDatabase,
    private notificationService: NotificationService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.firebaseAuth.currentUser.then(userData => {
      if (!!userData && 'uid' in userData && !!userData.uid) {
        this.ownerId = userData.uid;

        this.firebaseDatabase
          .list('products/', ref =>  ref.limitToLast(100).orderByChild('ownerId').equalTo(this.ownerId))
          .snapshotChanges()
          .subscribe(data => {
            this.products = data.map(e => {
              return {
                ...(e.payload.val() as ProductData)
              };
            });

            data.forEach((element, contador) => {
              this.products[contador].key = element.key;
            });

            this.products.sort((producto1, producto2) => producto1.nombre.localeCompare(producto2.nombre));
          });
      }
    });
  }

  onSubmit(form: NgForm) {
    const nombre = form.value.nombreProducto;
    const precio = parseInt(form.value.precioProducto);
    if (precio > 0) {
      this.firebaseAuth.currentUser
        .then(authData => {
          this.userService.getUserDataFromFirebase(authData.uid).then(userData => {
            this.productService
              .addNewProduct(
                nombre,
                this.talla,
                this.categoria,
                precio,
                this.uploadedFileUrl,
                userData.val().userName,
                authData.uid
              )
              .then(results => {
                this.notificationService.showSuccessMessage(
                  'Transacción exitosa',
                  'El producto se ha agregado exitosamente'
                );
                // this.posts = this.postService.getAllPosts();
              })
              .catch(error => {
                this.notificationService.showErrorMessage(
                  'Error!!!',
                  'Se ha producido el siguiente error al agregar el producto: ' + error.message
                );
                console.log(error.message);
              });
          });
        })
        .catch(err => {
          this.notificationService.showErrorMessage('Error', err.message);
        });
      form.reset();
    } else {
      this.notificationService.showErrorMessage(
        'Error en el precio',
        'El precio debe ser mayor o igual a 0'
      );
    }
  }

  onImagePicked(imageUrl: string) {
    this.uploadedFileUrl = imageUrl;
  }

  selectChangeHandlerTalla(event: any) {
    this.talla = event.target.value;
  }

  selectChangeHandlerCategoria(event: any) {
    this.categoria = parseInt(event.target.value);
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
}
