import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ComprasComponent} from './compras.component';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {RouteGuard} from '../shared/route-guard';
import {ProductsComponent} from '../products/products.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NavegacionComponent} from '../navegacion/navegacion.component';
import {SalesComponent} from '../sales/sales.component';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {LoginComponent} from '../login/login.component';
import {RegistroComponent} from '../registro/registro.component';
import {routes} from '../app-routing.module';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {HomeComponent} from '../home/home.component';
import {CatalogoComponent} from '../catalogo/catalogo.component';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';

import * as Mocks from '../shared/mocks';
import {PerfilComponent} from '../perfil/perfil.component';
import {ViewProductComponent} from '../view-product/view-product.component';

describe('ComprasComponent', () => {
  let component: ComprasComponent;
  let fixture: ComponentFixture<ComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), FormsModule, ToastrModule.forRoot()],
      declarations: [
        ComprasComponent,
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
        ProductsComponent
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
    fixture = TestBed.createComponent(ComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
