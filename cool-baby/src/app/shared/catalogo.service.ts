import {Injectable, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  public catalogoSeleccionado: any = new EventEmitter<any>();

  constructor(private router: Router) {}

  irACatalogo(categoria: string) {
    this.catalogoSeleccionado.emit(categoria);
    this.router.navigate(['/home']);
  }
}
