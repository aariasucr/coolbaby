import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {routes} from '../app-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginComponent} from '../login/login.component';
import {RegistroComponent} from '../registro/registro.component';
import {FormsModule, NgForm} from '@angular/forms';
import {NavegacionComponent} from '../navegacion/navegacion.component';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {ConfigService} from '../shared/config.service';
import {ToastrModule} from 'ngx-toastr';

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

  const mockConfig: any = {
    getConfig() {
      return Promise.resolve(true);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, LoginComponent, RegistroComponent, NavegacionComponent],
      imports: [FormsModule, RouterTestingModule.withRoutes(routes), ToastrModule.forRoot()],
      providers: [
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: mockDatabase},
        {provide: AngularFireStorage, useValue: null},
        {provide: ConfigService, useValue: mockConfig}
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
