import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { FormsModule, NgForm } from '@angular/forms';
//import { AngularFireModule } from '@angular/fire';
//import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { HomeComponent } from '../home/home.component';
import { SalesComponent } from '../sales/sales.component';
import { ProductsComponent } from '../products/products.component';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { NavegacionComponent } from '../navegacion/navegacion.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ToastrModule } from 'ngx-toastr';
import { RouteGuard } from '../shared/route-guard';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ProductService } from '../shared/product.service';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  const datosUsuario = {
    uid: 'usuarioPrueba'
  };

  const datosProducto = {
    id: 'idPrueba'
  }

  const mockParam = {
    paramMap: of(
      convertToParamMap({
        onwerName: 'propietario',
        productId: 'idProduct',
      })
    )
  }

  // Mock del objeto AngularFireAuth
  const mockAngularFireAuth: any = {
    currentUser: Promise.resolve(datosUsuario)
  };

  // Mock de la base de datos
  const mockDatabase: any = {
    object() {
      return {
        snapshotChanges() {
          return {subscribe() {}};
        }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ToastrModule.forRoot()
      ],
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
        FileUploaderComponent
      ],
      providers: [
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: mockDatabase},
        {provide: AngularFireStorage, useValue: null},
        {provide: ActivatedRoute, useValue: mockParam},
        RouteGuard,
        ProductService
      ]
    })
    .compileComponents();
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
    component.ngOnInit();
    tick(100);
    expect(component.productId).toBeTruthy();
    expect(component.camposForm).toBeTruthy();
    expect(component.ownerId).toBeTruthy();
    expect(component.ownerId.length).toBeGreaterThan(0);
    expect(component.productId.length).toBeGreaterThan(0);
    expect(component.camposForm.length).toBeGreaterThan(0);
    expect(component.productId).not.toBe('');
    expect(component.camposForm).not.toBe(null);
    expect(component.ownerId).not.toBe('');
  }));

  it('should upload', () => {
    const dummyUrl = 'url de prueba';
    component.onImagePicked(dummyUrl);
    expect(component.uploadedFileUrl).toBe(dummyUrl);
  });

  it('should submit form', async() => {
    const testForm = {
      reset() {},
      value: {
        nombreProducto: 'blah',
        precioProducto: 'lorem ipsum',
        tallaProducto: 'XXL',
        categoriaProducto: 0
      }
    } as NgForm;

    //const resetSpy: jasmine.Spy = spyOn(testForm, 'reset');

    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    let activatedRouterSpy = TestBed.get(ActivatedRoute);
    //let activatedRouterSpy = jasmine.createSpyObj('ActivatedRoute', ['navigate']);
    let userServiceSpy = jasmine.createSpyObj('UserService', ['getUserDataFromFirebase']);
    let notificacionServiceSpy = jasmine.createSpyObj('NotificacionServcie', [
      'showSuccessMessage',
      'showErrorMessage'
    ]);
    let productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductById',
      'updateProduct'
    ]);
    //let productServiceSpy = TestBed.get(ProductService);
    //productServiceSpy.getProductById(mockProducto.propietario, mockProducto.id);
    //let databaseSpy = TestBed.get(AngularFireDatabaseModule);

    let serv = new ProductDetailComponent(
      activatedRouterSpy,
      routerSpy,
      productServiceSpy,
      userServiceSpy,
      mockAngularFireAuth,
      mockDatabase,
      notificacionServiceSpy,
    );

    component.onSubmit(testForm);

    //expect(resetSpy).toHaveBeenCalled();
    //expect(resetSpy.calls.all().length).toEqual(1);
  });

  it('should render app-navegacion tag', () => {
    const fixture = TestBed.createComponent(ProductDetailComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navegacion').textContent).toBeDefined();
  });
});
