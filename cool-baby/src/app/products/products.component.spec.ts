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

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  const datosUsuario = {
    uid: 'usuarioPrueba'
  };

  // Mock del objeto AngularFireAuth
  const mockAngularFireAuth: any = {
    currentUser: Promise.resolve(datosUsuario)
  };

  let mockCategoria = {
    val() {
      return {
        key: 0,
        name: 'CategoriaTest'
      };
    }
  };

  // Mock de la base de datos
  const mockDatabase: any = {
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
            return Promise.resolve(mockCategoria);
          }
        };
      }
    }
  };

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
        FileUploaderComponent
      ],
      providers: [
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: mockDatabase},
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
      mockAngularFireAuth,
      mockDatabase,
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
