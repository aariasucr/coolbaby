import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationService} from '../shared/notification.service';
import {ProductService} from '../shared/product.service';
import {ProductData} from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userID = '';
  pageTitle = '';
  ventasTotales = 0;
  public productos: ProductData[] = [];
  comprasTotales = 0;
  articulosTotales = 0;

  constructor(
    private userService: UserService,
    private firebaseDatabase: AngularFireDatabase,
    private notificationService: NotificationService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.firebaseDatabase
      .list('products', ref => ref.orderByChild('likes').limitToLast(5))
      .snapshotChanges()
      .subscribe(data => {
        this.productos = data.map(e => {
          return {
            ...(e.payload.val() as ProductData)
          };
        });

        data.forEach((element, contador) => {
          this.productos[contador].key = element.key;
        });

        this.productos = this.productos.reverse();
      });
    this.userService.getCurrentUser().then(user => {
      this.productService.getSalesByBuyerId(user.uid).then(compras => {
        let comprasVal = compras.val();
        for (let compra in comprasVal) {
          this.comprasTotales++;
        }
        console.log(this.comprasTotales);
      });
      this.productService.getProducts().then(products => {
        let allProducts = products.val();
        for (let productoKey in allProducts) {
          let productoObj = allProducts[productoKey] as ProductData;
          if (productoObj.ownerId === user.uid) {
            this.articulosTotales++;
          }
        }
      });
    });
  }

  logout() {
    this.userService.performLogout();
    this.notificationService.showSuccessMessage(
      'Sesión finalizada',
      'La sesión se ha cerrado correctamente'
    );
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
