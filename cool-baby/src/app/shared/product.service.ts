import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {TentativeProduct, ProductData} from './models';

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
    owner: string,
    ownerId: string
  ) {
    return this.firebaseAuth.currentUser.then(userData => {
      const firebaseUserId = userData.uid;
      const newProductKey = this.firebaseDatabase.database
        .ref()
        .child(`products`)
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
        owner: owner,
        ownerId: ownerId,
        likes: 0
      };

      const updates = {};
      updates[`products/${newProductKey}`] = newProduct;

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

  addSale(productoVendido: ProductData, buyerUid: string) {
    const newSalesKey = this.firebaseDatabase.database
      .ref()
      .child(`sales/${buyerUid}`)
      .push().key;
    return this.firebaseDatabase.database
      .ref(`sales/${buyerUid}/${newSalesKey}`)
      .set(productoVendido);
  }

  updateProduct(
    productID: string,
    nombre: string,
    talla: string,
    categoria: number,
    precio: number,
    imgUrl: string,
    owner: string,
    ownerId: string,
    likes: number
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
        owner: owner,
        ownerId: ownerId,
        likes: likes
      };

      const updates = {};
      updates[`products/${productID}`] = product;

      return this.firebaseDatabase.database.ref().update(updates);
    });
  }

  getProductByProductId(productUid: string) {
    return this.firebaseDatabase.database
      .ref('products')
      .child(productUid)
      .once('value');
  }

  getTentativesByProductId(productUid: string) {
    let snapshot = this.firebaseDatabase.database
      .ref('tentatives')
      .child(productUid)
      .once('value');
    return snapshot;
  }

  getTentativesByUserId(userId: string) {
    let snapshot = this.firebaseDatabase.database
      .ref('tentatives')
      .child(userId)
      .once('value');
    return snapshot;
  }

  getCategoria(categoria: number) {
    return this.firebaseDatabase.database
      .ref(`categories/${categoria}`)
      .child('/')
      .once('value');
    //return nombreCategoria;
  }
}
