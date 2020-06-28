import {Injectable, EventEmitter} from '@angular/core';
import {UserData, RegisterData} from './models';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedIn = false;
  public statusChange: any = new EventEmitter<any>();

  constructor(private firebaseAuth: AngularFireAuth, private firebaseDB: AngularFireDatabase) {}

  performLogin(uid: string) {
    this.getUserDataFromFirebase(uid)
      .then(result => {
        this.isLoggedIn = true;
        const userData: UserData = result.val();

        this.statusChange.emit(userData);
      })
      .catch(error => {
        console.log('Hay un error?', error);
      });
  }

  //Hay una buena probabilidad de que necesitemos ese uid en el futuro
  performAnonimousLogin(/*uid: string*/) {
    this.isLoggedIn = true;
    const userData: UserData = {
      created: null,
      lastUpdate: null,
      email: null,
      userName: 'Anon',
      fullName: 'AnonimousUser',
      img: null
    };
    this.statusChange.emit(userData);
  }

  addRegisterData(registerData: RegisterData, uid: any) {
    this.addRegisterDataToFireBase(registerData, uid)
      .then(result => {
        console.log('Registro completado:', registerData);
      })
      .catch(error => {
        console.log('Error registrando usuario:', error);
      });
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

  performLogout() {
    this.firebaseAuth.signOut().then(() => {
      this.isLoggedIn = false;
      this.statusChange.emit(null);
    });
  }

  getUserDataFromFirebase(uid: string) {
    return this.firebaseDB.database
      .ref('users')
      .child(uid)
      .once('value');
  }

  addRegisterDataToFireBase(registerData: RegisterData, uid: any) {
    return this.firebaseDB.database.ref(`users/${uid}`).update(registerData);
  }

  getCurrentUser() {
    return this.firebaseAuth.currentUser;
  }

  getAllUsers() {
    return this.firebaseDB.database.ref('users').once('value');
  }
}
