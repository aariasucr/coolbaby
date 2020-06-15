import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth) { }

  addNewProduct(nombre: string, precio: number, talla: string, cantidad: number, cantidadVentas: number, precioTotal: number, totalVentas, imgUrl: string, owner: string) {
    return this.firebaseAuth.currentUser.then(userData => {
      const firebaseUserId = userData.uid;
      const newProductKey = this.firebaseDatabase.database
        .ref()
        .child(`products/${firebaseUserId}`)
        .push().key;

      if (imgUrl === '') {
        imgUrl = 'https://placeimg.com/320/240/any/sepia';
      }

      const newProduct = {
        created: new Date().getTime(),
        nombre: nombre,
        precio: precio,
        talla: talla,
        cantidad: cantidad,
        cantidadVentas: cantidadVentas,
        precioTotal: precioTotal,
        totalVentas: totalVentas,
        img: imgUrl,
        owner: owner
      };

      const updates = {};
      updates[`products/${firebaseUserId}/${newProductKey}`] = newProduct;

      return this.firebaseDatabase.database.ref().update(updates);
      //return this.firebaseDatabase.database.ref(`products/${firebaseUserId}/${newProductKey}`).update(newProduct);
    });
  }

  getProducts(owner: string){
    /*this.firebaseDatabase.database
      .ref(`products`).child(owner).once('value').then(result => {
        console.log('cosa rara: ' + result.val());
      });*/
    return this.firebaseDatabase.database
      .ref('products')
      .child(owner)
      .once('value');
  }
}
