import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}
}
