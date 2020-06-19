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

        console.log('userID: ' + userData.uid);

        this.firebaseDatabase
          .list(`products/${this.owner}`, ref => ref.limitToLast(100).orderByChild('nombre'))
          .snapshotChanges()
          .subscribe(data => {
            console.log(data);
            this.products = data.map(e => {
              return {
                ...(e.payload.val() as ProductData)
              };
            });
            //this.products = this.products.reverse();
            console.log(this.products[0]);
          });
      }
    });
  }
}
