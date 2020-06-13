import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, NgForm} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';

import {environment} from '../../environments/environment';

import {RegistroComponent} from '../registro/registro.component';

import {NavegacionComponent} from '../navegacion/navegacion.component';
import {HomeComponent} from '../home/home.component';
import {ToastrModule} from 'ngx-toastr';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const datosUsuario = {
    user: {
      created: 123,
      lastUpdate: 456,
      email: 'emailMock',
      userName: 'userNameMock',
      fullName: 'fullNameMock',
      img: 'imgMock',
      uid: 'userUidMock'
    }
  };

  const formData = {
    email: 'emailMock',
    password: '123'
  };

  const mockAngularFireAuth: any = {
    signInWithEmailAndPassword(email, password) {
      return Promise.resolve(datosUsuario);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule
      ],
      declarations: [LoginComponent, RegistroComponent, HomeComponent, NavegacionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    const testForm = {
      reset() {},
      value: {
        email: formData.email,
        password: formData.password
      }
    } as NgForm;
    let userServiceSpy = jasmine.createSpyObj('UserService', ['performLogin']);
    userServiceSpy.performLogin.and.returnValue(datosUsuario.user);
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']); //this.router.navigate
    let notificationServiceSpy = jasmine.createSpyObj('NotificacionService', [
      'showSuccessMessage',
      'showErrorMessage'
    ]);

    let serv = new LoginComponent(
      mockAngularFireAuth,
      routerSpy,
      userServiceSpy,
      notificationServiceSpy
    );

    serv.onSubmit(testForm);
  });
});
