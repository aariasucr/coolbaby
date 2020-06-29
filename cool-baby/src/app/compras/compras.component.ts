import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {ProductData} from '../shared/models';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  public products: ProductData[] = [];
  uploadedFileUrl = '';
  owner = '';

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebaseDatabase: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.firebaseAuth.currentUser.then(userData => {
      console.log('what:', userData);
      if (!!userData && 'uid' in userData && !!userData.uid) {
        this.owner = userData.uid;
        console.log('mentira que es owner:', this.owner);
        this.firebaseDatabase
          .list(`sales/${this.owner}`, ref => ref.limitToLast(100).orderByChild('nombre'))
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
          });
      }
    });
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
        return 'Sin categoría';
    }
  }
}
