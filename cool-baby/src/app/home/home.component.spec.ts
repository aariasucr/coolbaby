import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {routes} from '../app-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginComponent} from '../login/login.component';
import {RegistroComponent} from '../registro/registro.component';
import {FormsModule, NgForm} from '@angular/forms';
import {NavegacionComponent} from '../navegacion/navegacion.component';
import {CatalogoComponent} from '../catalogo/catalogo.component';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {ToastrModule} from 'ngx-toastr';
import { SalesComponent } from '../sales/sales.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // Mock de datos de usuario
  const datosUsuario = {
    uid: 'usuarioPrueba'
  };

  // Mock del objeto AngularFireAuth
  const mockAngularFireAuth: any = {
    currentUser: Promise.resolve(datosUsuario)
  };

  const mockDatabase: any = {
    list() {
      return {
        snapshotChanges() {
          return {subscribe() {}};
        }
      };
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        LoginComponent,
        RegistroComponent,
        NavegacionComponent,
        CatalogoComponent,
        SalesComponent,
        FileUploaderComponent
      ],
      imports: [FormsModule, RouterTestingModule.withRoutes(routes), ToastrModule.forRoot()],
      providers: [
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: mockDatabase},
        {provide: AngularFireStorage, useValue: null}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
