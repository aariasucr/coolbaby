import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {ProductDetailComponent} from './product-detail.component';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../app-routing.module';
import {FormsModule, NgForm} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {HomeComponent} from '../home/home.component';
import {SalesComponent} from '../sales/sales.component';
import {ProductsComponent} from '../products/products.component';
import {LoginComponent} from '../login/login.component';
import {RegistroComponent} from '../registro/registro.component';
import {CatalogoComponent} from '../catalogo/catalogo.component';
import {NavegacionComponent} from '../navegacion/navegacion.component';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {ToastrModule} from 'ngx-toastr';
import {RouteGuard} from '../shared/route-guard';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../shared/product.service';

import * as Mock from '../shared/mocks';
import {PerfilComponent} from '../perfil/perfil.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  // Mock de la base de datos
  const mockDatabase: any = {
    object() {
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
            return Promise.resolve(Mock.mockCategoria);
          }
        };
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), FormsModule, ToastrModule.forRoot()],
      declarations: [
        ProductDetailComponent,
        HomeComponent,
        SalesComponent,
        ProductsComponent,
        LoginComponent,
        RegistroComponent,
        HomeComponent,
        CatalogoComponent,
        NavegacionComponent,
        FileUploaderComponent,
        PerfilComponent
      ],
      providers: [
        {provide: AngularFireAuth, useValue: Mock.mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: Mock.mockDatabase},
        {provide: AngularFireStorage, useValue: null},
        {provide: ActivatedRoute, useValue: Mock.mockParam},
        RouteGuard,
        ProductService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', fakeAsync(() => {
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    let activatedRouterSpy = TestBed.get(ActivatedRoute);
    let userServiceSpy = jasmine.createSpyObj('UserService', [
      'getUserDataFromFirebase',
      'getAllUsers'
    ]);
    let notificacionServiceSpy = jasmine.createSpyObj('NotificacionServcie', [
      'showSuccessMessage',
      'showErrorMessage'
    ]);
    let productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductById',
      'updateProduct',
      'getTentativesByUserId'
    ]);

    productServiceSpy.getTentativesByUserId.and.returnValue(Promise.resolve(Mock.mockTentatives));

    userServiceSpy.getAllUsers.and.returnValue(Promise.resolve(Mock.mockDatosUsuario));

    let serv = new ProductDetailComponent(
      activatedRouterSpy,
      routerSpy,
      productServiceSpy,
      userServiceSpy,
      Mock.mockAngularFireAuth,
      Mock.mockDatabase,
      notificacionServiceSpy
    );

    serv.ngOnInit();
    tick(100);
    expect(serv.productId).toBeTruthy();
    expect(serv.camposForm).toBeTruthy();
    expect(serv.ownerId).toBeTruthy();
    expect(serv.ownerId.length).toBeGreaterThan(0);
    expect(serv.productId.length).toBeGreaterThan(0);
    expect(serv.camposForm.length).toBeGreaterThan(0);
    expect(serv.productId).not.toBe('');
    expect(serv.camposForm).not.toBe(null);
    expect(serv.ownerId).not.toBe('');
  }));

  it('should upload', () => {
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    let activatedRouterSpy = TestBed.get(ActivatedRoute);
    let userServiceSpy = jasmine.createSpyObj('UserService', [
      'getUserDataFromFirebase',
      'getAllUsers'
    ]);
    let notificacionServiceSpy = jasmine.createSpyObj('NotificacionServcie', [
      'showSuccessMessage',
      'showErrorMessage'
    ]);
    let productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductById',
      'updateProduct',
      'getTentativesByUserId'
    ]);

    productServiceSpy.getTentativesByUserId.and.returnValue(Promise.resolve(Mock.mockTentatives));

    userServiceSpy.getAllUsers.and.returnValue(Promise.resolve(Mock.mockDatosUsuario));

    let serv = new ProductDetailComponent(
      activatedRouterSpy,
      routerSpy,
      productServiceSpy,
      userServiceSpy,
      Mock.mockAngularFireAuth,
      Mock.mockDatabase,
      notificacionServiceSpy
    );
    const dummyUrl = 'url de prueba';
    serv.onImagePicked(dummyUrl);
    expect(serv.uploadedFileUrl).toBe(dummyUrl);
  });

  it('should submit form', async () => {
    const testForm = {
      reset() {},
      value: {
        nombreProducto: 'blah',
        precioProducto: 'lorem ipsum',
        tallaProducto: 'XXL',
        categoriaProducto: 0
      }
    } as NgForm;

    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    let activatedRouterSpy = TestBed.get(ActivatedRoute);
    let userServiceSpy = jasmine.createSpyObj('UserService', ['getUserDataFromFirebase']);
    let notificacionServiceSpy = jasmine.createSpyObj('NotificacionServcie', [
      'showSuccessMessage',
      'showErrorMessage'
    ]);
    let productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductById',
      'updateProduct'
    ]);

    let serv = new ProductDetailComponent(
      activatedRouterSpy,
      routerSpy,
      productServiceSpy,
      userServiceSpy,
      Mock.mockAngularFireAuth,
      Mock.mockDatabase,
      notificacionServiceSpy
    );

    component.onSubmit(testForm);
  });

  it('should render app-navegacion tag', () => {
    const fixture = TestBed.createComponent(ProductDetailComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navegacion').textContent).toBeDefined();
  });
});
