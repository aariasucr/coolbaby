import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {PerfilComponent} from './perfil.component';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../app-routing.module';
import {FormsModule, NgForm} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {RouteGuard} from '../shared/route-guard';

import * as Mocks from '../shared/mocks';

import {ProductsComponent} from '../products/products.component';
import {ToastrModule} from 'ngx-toastr';
import {HomeComponent} from '../home/home.component';
import {SalesComponent} from '../sales/sales.component';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {LoginComponent} from '../login/login.component';
import {RegistroComponent} from '../registro/registro.component';
import {CatalogoComponent} from '../catalogo/catalogo.component';
import {NavegacionComponent} from '../navegacion/navegacion.component';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {ViewProductComponent} from '../view-product/view-product.component';
import {ComprasComponent} from '../compras/compras.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  const mockDatabase: any = {
    object() {
      return {
        snapshotChanges() {
          return {subscribe() {}};
        }
      };
    },
    list() {
      return {
        snapshotChanges() {
          return {subscribe() {}};
        }
      };
    },
    database: {
      ref() {
        return {
          once() {
            return Promise.resolve(Mocks.mockCategoria);
          }
        };
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), FormsModule, ToastrModule.forRoot()],
      declarations: [
        PerfilComponent,
        ProductsComponent,
        HomeComponent,
        SalesComponent,
        ProductDetailComponent,
        LoginComponent,
        RegistroComponent,
        CatalogoComponent,
        NavegacionComponent,
        FileUploaderComponent,
        ViewProductComponent,
        ComprasComponent
      ],
      providers: [
        {provide: AngularFireAuth, useValue: Mocks.mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: Mocks.mockDatabase},
        {provide: AngularFireStorage, useValue: null},
        RouteGuard
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', fakeAsync(() => {
    component.ngOnInit();
    tick(100);
    expect(component.userId).toBeTruthy();
    expect(component.users).toBeTruthy();
    expect(component.userId.length).toBeGreaterThan(0);
    expect(component.userId).not.toBe('');
    expect(component.users).not.toBe(null);
  }));

  it('should submit form', () => {
    const testForm = {
      reset() {},
      value: {
        fullName: 'Nombre Completo Prueba',
        email: 'correoPrueba@prueba.com',
        userName: 'usuarioPrueba'
      }
    } as NgForm;

    let userServiceSpy = jasmine.createSpyObj('UserService', ['getUserDataFromFirebase']);
    let notificacionServiceSpy = jasmine.createSpyObj('NotificacionServcie', [
      'showSuccessMessage',
      'showErrorMessage'
    ]);

    let serv = new PerfilComponent(
      userServiceSpy,
      Mocks.mockAngularFireAuth,
      mockDatabase,
      notificacionServiceSpy
    );

    component.onSubmit(testForm);
  });

  it('should render app-navegacion tag', () => {
    const fixture = TestBed.createComponent(PerfilComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navegacion').textContent).toBeDefined();
  });
});
