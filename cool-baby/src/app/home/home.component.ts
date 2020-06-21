import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationService} from '../shared/notification.service';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userID = '';
  pageTitle = '';
  ventasTotales = 0;

  constructor(
    private userService: UserService,
    private firebaseAuth: AngularFireAuth,
    private notificationService: NotificationService,
    private productService: ProductService
  ) {}

  ngOnInit() {}

  logout() {
    this.userService.performLogout();
    this.notificationService.showSuccessMessage(
      'Sesión finalizada',
      'La sesión se ha cerrado correctamente'
    );
  }
}
