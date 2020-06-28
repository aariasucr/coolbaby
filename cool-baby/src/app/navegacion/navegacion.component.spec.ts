import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {NavegacionComponent} from './navegacion.component';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {RegistroComponent} from '../registro/registro.component';
import {CatalogoComponent} from '../catalogo/catalogo.component';

import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../../environments/environment';
import { SalesComponent } from '../sales/sales.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ProductsComponent } from '../products/products.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { ViewProductComponent } from '../view-product/view-product.component';

describe('NavegacionComponent', () => {
  let component: NavegacionComponent;
  let fixture: ComponentFixture<NavegacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavegacionComponent,
        HomeComponent,
        LoginComponent,
        RegistroComponent,
        CatalogoComponent,
        SalesComponent,
        FileUploaderComponent,
        ProductsComponent,
        ProductDetailComponent,
        PerfilComponent,
        ViewProductComponent
      ],
      imports: [
        FormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
