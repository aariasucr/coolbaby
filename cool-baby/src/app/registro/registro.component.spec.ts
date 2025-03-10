import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistroComponent} from './registro.component';

import {FormsModule, NgForm} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {LoginComponent} from '../login/login.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {ToastrModule} from 'ngx-toastr';

import {environment} from '../../environments/environment';
import {HomeComponent} from '../home/home.component';
import {NavegacionComponent} from '../navegacion/navegacion.component';
import {CatalogoComponent} from '../catalogo/catalogo.component';
import {SalesComponent} from '../sales/sales.component';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {ProductsComponent} from '../products/products.component';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {PerfilComponent} from '../perfil/perfil.component';
import {ViewProductComponent} from '../view-product/view-product.component';
import {ComprasComponent} from '../compras/compras.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  const datosRegistroUsuario = {
    user: {
      uid: 'userUidMock'
    }
  };

  const formData = {
    email: 'emailMock',
    password: '123',
    userName: 'testUserName',
    fullName: 'testFullName'
  };

  const mockAngularFireAuth: any = {
    createUserWithEmailAndPassword(email, password) {
      return Promise.resolve(datosRegistroUsuario);
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
      declarations: [
        RegistroComponent,
        LoginComponent,
        HomeComponent,
        NavegacionComponent,
        CatalogoComponent,
        SalesComponent,
        FileUploaderComponent,
        ProductsComponent,
        ProductDetailComponent,
        PerfilComponent,
        ViewProductComponent,
        ComprasComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
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
    let userServiceSpy = jasmine.createSpyObj('UserService', ['addRegisterData']);
    userServiceSpy.addRegisterData.and.returnValue(datosRegistroUsuario.user);
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']); //this.router.navigate
    let notificacionServiceSpy = jasmine.createSpyObj('NotificacionServcie', [
      'showSuccessMessage',
      'showErrorMessage'
    ]);
    console.log('not going to commit');
    let serv = new RegistroComponent(
      mockAngularFireAuth,
      routerSpy,
      userServiceSpy,
      notificacionServiceSpy
    );

    serv.onSubmit(testForm);
  });
});
