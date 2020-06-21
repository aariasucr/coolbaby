import { Component, OnInit } from '@angular/core';
import { ProductData } from '../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { NotificationService } from '../shared/notification.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public ownerName = null;
  public productId = null;
  public products: ProductData[] = [];
  public product: ProductData;
  camposForm: boolean[] = [true, true, true, true, true];
  uploadedFileUrl = '';
  talla = '';
  categoria = -1;
  ownerId = '';
  nombreProducto = '';
  precioProducto = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private userService: UserService,
    private firebaseAuth: AngularFireAuth,
    private firebaseDatabase: AngularFireDatabase,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      //console.log(params);
      if (!params.has('productId') && !params.has('onwerName')) {
        this.router.navigate(['/home']);
        return;
      }

      this.firebaseAuth.currentUser.then(userData => {
        // console.log('userData en el componente', userData);
        if (!!userData && 'uid' in userData && !!userData.uid) {
          this.ownerId = userData.uid;

          this.ownerName = params.get('ownerName');
          this.productId = params.get('productId');
          this.firebaseDatabase
            .object(`products/${this.ownerId}/${this.productId}`)
            .snapshotChanges()
            .subscribe(data => {
              this.product = data.payload.val() as ProductData;
              this.nombreProducto = this.product.nombre;
              this.precioProducto = this.product.precio;
              this.uploadedFileUrl = this.product.img;
              this.talla = this.product.talla;
              this.categoria = this.product.categoria;
            });
        }
      });
    });
  }

  onSubmit(form: NgForm) {
    const nombre = form.value.nombreProducto;
    const precio = parseInt(form.value.precioProducto);

    this.firebaseAuth.currentUser
      .then(authData => {
        this.userService.getUserDataFromFirebase(authData.uid).then(userData => {
          this.productService
            .updateProduct(
              this.productId,
              (nombre === undefined || nombre === '' ? this.product.nombre : nombre),
              (this.talla === '' ? this.product.talla : this.talla),
              (this.categoria < -1 ? this.product.categoria : this.categoria),
              (precio === undefined || precio < 0 || isNaN(precio) ? this.product.precio : precio),
              (this.uploadedFileUrl === '' ? this.product.img : this.uploadedFileUrl),
              userData.val().userName)
            .then(results => {
              this.notificationService.showSuccessMessage('Transacción exitosa', 'El artículo se ha actualizado');
            })
            .catch(error => {
              this.notificationService.showErrorMessage('Error!!!', 'Se ha producido el siguiente error al actualizar el artículo: ' + error.message);
              console.log(error.message);
            });
        });
      })
      .catch(err => {
        this.notificationService.showErrorMessage('Error', err.message);
      });
  }

  onImagePicked(imageUrl: string) {
    console.log('url en firebase listo para guardar en la base de datos', imageUrl);
    this.uploadedFileUrl = imageUrl;
    this.camposForm[4] = false;
  }

  selectChangeHandlerTalla(event: any){
    this.talla = event.target.value;
  }

  selectChangeHandlerCategoria(event: any){
    this.categoria = parseInt(event.target.value);
    console.log('categoria: ' + parseInt(event.target.value));
  }

  habilitarCampo(campo: number){
    this.camposForm[campo] = false;
    this.camposForm[4] = false;
  }

  seleccionarTalla(talla: string){
    return (this.talla === talla ? true : false);
  }

  seleccionarCategoria(categoria: number){
    return (this.categoria === categoria ? true : false);
  }
}
