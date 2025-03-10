import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {ProductsComponent} from './products.component';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../app-routing.module';
import {FormsModule, NgForm} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {HomeComponent} from '../home/home.component';
import {NavegacionComponent} from '../navegacion/navegacion.component';
import {SalesComponent} from '../sales/sales.component';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {LoginComponent} from '../login/login.component';
import {RegistroComponent} from '../registro/registro.component';
import {CatalogoComponent} from '../catalogo/catalogo.component';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {AngularFireAuthModule, AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabaseModule, AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorageModule, AngularFireStorage} from '@angular/fire/storage';
import {RouteGuard} from '../shared/route-guard';

import * as Mocks from '../shared/mocks';
import {PerfilComponent} from '../perfil/perfil.component';
import {ViewProductComponent} from '../view-product/view-product.component';
import {ComprasComponent} from '../compras/compras.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), FormsModule, ToastrModule.forRoot()],
      declarations: [
        ProductsComponent,
        HomeComponent,
        NavegacionComponent,
        SalesComponent,
        ProductDetailComponent,
        LoginComponent,
        RegistroComponent,
        CatalogoComponent,
        FileUploaderComponent,
        PerfilComponent,
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
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', fakeAsync(() => {
    component.ngOnInit();
    tick(100);
    expect(component.ownerId).toBeTruthy();
    expect(component.products).toBeTruthy();
    expect(component.ownerId.length).toBeGreaterThan(0);
    expect(component.ownerId).not.toBe('');
    expect(component.products).not.toBe(null);
  }));

  it('should upload', () => {
    const dummyUrl = 'url de prueba';
    component.onImagePicked(dummyUrl);
    expect(component.uploadedFileUrl).toBe(dummyUrl);
  });

  it('should submit form', () => {
    const testForm = {
      reset() {},
      value: {
        nombreProducto: 'blah',
        precioProducto: 1,
        tallaProducto: 'XS',
        categoriaProducto: 1
      }
    } as NgForm;

    const resetSpy: jasmine.Spy = spyOn(testForm, 'reset');
    let userServiceSpy = jasmine.createSpyObj('UserService', ['getUserDataFromFirebase']);
    let notificacionServiceSpy = jasmine.createSpyObj('NotificacionServcie', [
      'showSuccessMessage',
      'showErrorMessage'
    ]);
    let productServiceSpy = jasmine.createSpyObj('ProductService', ['addNewProduct']);

    let serv = new ProductsComponent(
      userServiceSpy,
      Mocks.mockAngularFireAuth,
      Mocks.mockDatabase,
      notificacionServiceSpy,
      productServiceSpy
    );

    component.onSubmit(testForm);

    expect(resetSpy).toHaveBeenCalled();
    expect(resetSpy.calls.all().length).toEqual(1);
  });

  it('should render app-navegacion tag', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navegacion').textContent).toBeDefined();
  });
});
