import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { NotificationService } from '../shared/notification.service';
import { NgForm } from '@angular/forms';
import { UserData, RegisterData } from '../shared/models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: UserData;
  userId: string;
  userName: string;
  fullName: string;
  email: string;
  camposHabilitados = false;
  users: UserData[] = [];

  constructor(
    private userService: UserService,
    private firebaseAuth: AngularFireAuth,
    private firebaseDatabase: AngularFireDatabase,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.firebaseAuth.currentUser.then(userData => {
      if (!!userData && 'uid' in userData && !!userData.uid) {
        this.userId = userData.uid;

        this.firebaseDatabase
          .object(`users/${this.userId}`)
          .snapshotChanges()
          .subscribe(data => {
            this.user = data.payload.val() as UserData;
            this.userName = this.user.userName;
            this.email = this.user.email;
            this.fullName = this.user.fullName;
          });

        this.firebaseDatabase
          .list('users')
          .snapshotChanges()
          .subscribe(data => {
            this.users = data.map(e => {
              return {
                ...(e.payload.val() as UserData)
              };
            });
          });
      }
    });
  }

  onSubmit(form: NgForm) {
    console.log(this.users);
    let newUserName = form.value.userName;
    let newEmail = form.value.email;
    let newFullName = form.value.fullName;

    if(this.comprobarNombreUsuario(newUserName) && this.comprobarEmail(newEmail)){
      this.firebaseAuth.currentUser.then(result => {
        let datosUsuario: RegisterData = {
          created: this.user.created,
          lastUpdate: this.user.lastUpdate,
          email: (newEmail == '' ? this.email : newEmail),
          userName: (newUserName == '' ? this.userName : newUserName),
          fullName: (newFullName === '' ? this.fullName : newFullName)
        };
        this.firebaseDatabase.object(`users/${this.userId}`).update(datosUsuario);
        result.updateEmail(datosUsuario.email);
        this.userService.statusChange.emit(datosUsuario);
        this.camposHabilitados = false;
        this.notificationService.showSuccessMessage('Actualización de datos', 'Se ha actualizado la información de usuario');
      })
      .catch(error => {
        this.notificationService.showErrorMessage('Error en la actualización', error.message);
      });
    } else {
      this.notificationService.showErrorMessage('Error en la actualización', 'El nombre de usuario o el correo electrónico ya están asociados a otro usuario');
    }
  }

  comprobarNombreUsuario(newUserName: string){
    let resultado = true;
    if(newUserName != '' && newUserName != this.userName){
      this.users.forEach(elemento => {
        if(elemento.userName == newUserName){
          resultado = false;
        }
      });
    }
    return resultado;
  }

  comprobarEmail(newEmail: string){
    let resultado = true;
    if(newEmail != '' && newEmail != this.email){
      this.users.forEach(elemento => {
        if(elemento.email == newEmail){
          resultado = false;
        }
      });
    }
    return resultado;
  }

  enviarCorreoPassword(){
    this.firebaseAuth.sendPasswordResetEmail(this.email)
      .then(() => {
        this.notificationService.showSuccessMessage('Reseteo de contraseña', 'Se ha enviado un correo electrónico a la dirección ' + this.email);
      })
      .catch(error => {
        this.notificationService.showErrorMessage('Error al enviar correo', 'Ha ocurrido el siguiente error: ' + error.message);
      });
  }
}
