import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {TentativeProduct} from './models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {}

  addNewProduct(
    nombre: string,
    talla: string,
    categoria: number,
    precio: number,
    imgUrl: string,
    owner: string
  ) {
    return this.firebaseAuth.currentUser.then(userData => {
      const firebaseUserId = userData.uid;
      const newProductKey = this.firebaseDatabase.database
        .ref()
        .child(`products/${firebaseUserId}`)
        .push().key;

      if (imgUrl === '') {
        imgUrl =
          'https://naibuzz.com/wp-content/uploads/2015/06/are-you-serious-wtf-meme-baby-face.jpg';
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

  addTentativeBuy(tentativeBuy: TentativeProduct, ownerUid: string) {
    const newTentativeKey = this.firebaseDatabase.database
      .ref()
      .child(`products/${ownerUid}`)
      .push().key;
    return this.firebaseDatabase.database
      .ref(`tentatives/${ownerUid}/${newTentativeKey}`)
      .set(tentativeBuy);
  }

  updateProduct(
    productID: string,
    nombre: string,
    talla: string,
    categoria: number,
    precio: number,
    imgUrl: string,
    owner: string
  ) {
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

      const updates = {};
      updates[`products/${firebaseUserId}/${productID}`] = product;

      return this.firebaseDatabase.database.ref().update(updates);
    });
  }

  getProductByProductId(productUid: string) {
    return this.firebaseDatabase.database
      .ref('products')
      .child(productUid)
      .once('value');
  }
}
