import {async, fakeAsync, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, NgForm} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';

//import {AngularFireModule} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';

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

  // const mockAngularFireAuth: any = {
  //   signInWithEmailAndPassword: Promise.resolve(datosUsuario)
  // };

  const mockAngularFireAuth: any = {
    signInWithEmailAndPassword(email, password) {
      return Promise.resolve(datosUsuario);
    }
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
      imports: [FormsModule, AppRoutingModule],
      providers: [
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: mockDatabase},
        {provide: AngularFireStorage, useValue: null}
      ],
      declarations: [LoginComponent]
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

    let serv = new LoginComponent(mockAngularFireAuth, routerSpy, userServiceSpy);

    serv.onSubmit(testForm);
  });
});
