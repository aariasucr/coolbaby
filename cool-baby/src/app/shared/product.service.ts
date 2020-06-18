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

  addNewProduct(nombre: string, talla: string, categoria: number, precio: number, imgUrl: string, owner: string) {
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
        talla: talla,
        categoria: categoria,
        precio: precio,
        img: imgUrl,
        owner: owner
      };

      const updates = {};
      updates[`products/${firebaseUserId}/${newProductKey}`] = newProduct;

      return this.firebaseDatabase.database.ref().update(updates);
      //return this.firebaseDatabase.database.ref(`products/${firebaseUserId}/${newProductKey}`).update(newProduct);
    });
  }

  updateProduct(productID: string, nombre: string, talla: string, categoria: number, precio: number, imgUrl: string, owner: string){
    return this.firebaseAuth.currentUser.then(userData => {
      const firebaseUserId = userData.uid;

      const product = {
        created: new Date().getTime(),
        nombre: nombre,
        talla: talla,
        categoria: categoria,
        precio: precio,
        img: imgUrl,
        owner: owner
      };

      console.log('producto en productService:');
      console.log(product);

      const updates = {};
      updates[`products/${firebaseUserId}/${productID}`] = product;

      return this.firebaseDatabase.database.ref().update(updates);
      //return this.firebaseDatabase.database.ref(`products/${firebaseUserId}/${newProductKey}`).update(newProduct);
    });
  }

  getProductById(owner: string, id: string){
    return this.firebaseDatabase.database
      .ref()
      .child(`products/${owner}/${id}`)
      .once('value');
    /*return this.firebaseDatabase.database
      .ref('products')
      .child(owner)
      .child(id)
      .once('value');*/
  }
}
