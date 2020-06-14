import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}

  logout() {
    this.userService.performLogout();
  }

  irCatalogo() {
    //this.router.navigate(['/catalogo']);
  }
}
