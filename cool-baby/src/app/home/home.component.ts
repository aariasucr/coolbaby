import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationService} from '../shared/notification.service';
import { ProductService } from '../shared/product.service';
import { ProductData } from '../shared/models';
import { element } from 'protractor';
//import { UserData, ProductData } from '../shared/models';
//import {UserData} from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userID = '';
  pageTitle = '';
  ventasTotales = 0;
  //productos: Number[];
  //userData: UserData;

  constructor(
    //private firebaseDatabase: AngularFireDatabase,
    //private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private firebaseAuth: AngularFireAuth,
    private notificationService: NotificationService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.firebaseAuth.currentUser.then(userData => {
      // console.log('userData en el componente', userData);
      if (!!userData && 'uid' in userData && !!userData.uid) {
        //this.userID = userData.uid;
        console.log('userID: ' + this.userID);
        this.productService.getProducts(userData.uid)
          .then(result => {
            const productos: ProductData[] = Object.values(result.val());
            console.log(productos);
            productos.forEach(element => {
              this.ventasTotales += element.totalVentas;
            });
          });
      }
    });
  }

  logout() {
    this.userService.performLogout();
    this.notificationService.showSuccessMessage(
      'Sesión finalizada',
      'La sesión se ha cerrado correctamente'
    );
  }
}
