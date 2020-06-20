import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private router: Router, private firebaseAuth: AngularFireAuth) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          console.log('no deberia entrar aca');
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
