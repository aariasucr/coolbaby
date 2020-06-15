import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {ProductData} from '../shared/models';
import {NotificationService} from '../shared/notification.service';

import {NgForm} from '@angular/forms';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  public products: ProductData[] = [];
  uploadedFileUrl = '';
  talla = '';
  owner = '';

  constructor(
    private userService: UserService,
    private firebaseAuth: AngularFireAuth,
    private firebaseDatabase: AngularFireDatabase,
    private notificationService: NotificationService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.firebaseAuth.currentUser.then(userData => {
      // console.log('userData en el componente', userData);
      if (!!userData && 'uid' in userData && !!userData.uid) {
        this.owner = userData.uid;

        this.firebaseDatabase
          .list(`products/${this.owner}`, ref => ref.limitToLast(100).orderByChild('totalVentas'))
          .snapshotChanges()
          .subscribe(data => {
            console.log(data);
            this.products = data.map(e => {
              return {
                ...(e.payload.val() as ProductData)
              };
            });
            this.products = this.products.reverse();
            console.log(this.products[0]);
          });
      }
    });
  }

  onSubmit(form: NgForm) {
    const nombre = form.value.nombreProducto;
    const precio = form.value.precioProducto;
    const cantidad = form.value.cantidadProducto;
    this.firebaseAuth.currentUser
      .then(authData => {
        this.userService.getUserDataFromFirebase(authData.uid).then(userData => {
          this.productService
            .addNewProduct(nombre, precio, this.talla, cantidad, 0, precio * cantidad, 0, this.uploadedFileUrl, userData.val().userName)
            .then(results => {
              this.notificationService.showSuccessMessage('Transacción exitosa', 'El producto se ha agregado exitosamente');
              // this.posts = this.postService.getAllPosts();
            })
            .catch(error => {
              this.notificationService.showErrorMessage('Error!!!', 'Se ha producido el siguiente error al agregar el producto: ' + error.message);
              console.log(error.message);
            });
        });
      })
      .catch(err => {
        this.notificationService.showErrorMessage('Error', err.message);
      });
    form.reset();
  }

  onImagePicked(imageUrl: string) {
    console.log('url en firebase listo para guardar en la base de datos', imageUrl);
    this.uploadedFileUrl = imageUrl;
  }

  selectChangeHandler(event: any){
    this.talla = event.target.value;
  }

}
