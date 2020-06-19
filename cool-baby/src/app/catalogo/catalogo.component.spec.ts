import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {CatalogoComponent} from './catalogo.component';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {RegistroComponent} from '../registro/registro.component';
import {NavegacionComponent} from '../navegacion/navegacion.component';

import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../../environments/environment';
import { SalesComponent } from '../sales/sales.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ProductsComponent } from '../products/products.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

describe('CatalogoComponent', () => {
  let component: CatalogoComponent;
  let fixture: ComponentFixture<CatalogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CatalogoComponent,
        NavegacionComponent,
        HomeComponent,
        LoginComponent,
        RegistroComponent,
        SalesComponent,
        FileUploaderComponent,
        ProductsComponent,
        ProductDetailComponent
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
    fixture = TestBed.createComponent(CatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-navegacion tag', () => {
    const fixture = TestBed.createComponent(CatalogoComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navegacion').textContent).toBeDefined();
  });
});
