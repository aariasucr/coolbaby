import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {ViewProductComponent} from './view-product.component';
import {routes} from '../app-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {NavegacionComponent} from '../navegacion/navegacion.component';
import {HomeComponent} from '../home/home.component';
import {SalesComponent} from '../sales/sales.component';
import {ProductsComponent} from '../products/products.component';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {LoginComponent} from '../login/login.component';
import {RegistroComponent} from '../registro/registro.component';
import {CatalogoComponent} from '../catalogo/catalogo.component';
import {PerfilComponent} from '../perfil/perfil.component';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {AngularFireAuth} from '@angular/fire/auth';

import * as Mock from '../shared/mocks';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute} from '@angular/router';
import {RouteGuard} from '../shared/route-guard';
import {ComprasComponent} from '../compras/compras.component';

describe('ViewProductComponent', () => {
  let component: ViewProductComponent;
  let fixture: ComponentFixture<ViewProductComponent>;

  const mockLikes: any = {
    val() {
      return {
        index: 0,
        productId: 'idP'
      };
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), FormsModule, ToastrModule.forRoot()],
      declarations: [
        ViewProductComponent,
        NavegacionComponent,
        HomeComponent,
        SalesComponent,
        ProductsComponent,
        ProductDetailComponent,
        LoginComponent,
        RegistroComponent,
        CatalogoComponent,
        PerfilComponent,
        FileUploaderComponent,
        ComprasComponent
      ],
      providers: [
        {provide: AngularFireAuth, useValue: Mock.mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: Mock.mockDatabase},
        {provide: AngularFireStorage, useValue: null},
        {provide: ActivatedRoute, useValue: Mock.mockParam},
        RouteGuard
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductComponent);
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
    expect(component.userId).toBeTruthy();
    expect(component.userId.length).toBeGreaterThan(0);
    expect(component.productId.length).toBeGreaterThan(0);
    expect(component.productId).not.toBe('');
    expect(component.producto).not.toBe(null);
    expect(component.userId).not.toBe('');
  }));

  it('should render app-navegacion tag', () => {
    const fixture = TestBed.createComponent(ViewProductComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navegacion').textContent).toBeDefined();
  });
});
