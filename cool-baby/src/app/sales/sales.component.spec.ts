import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {SalesComponent} from './sales.component';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../app-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {HomeComponent} from '../home/home.component';
import {NavegacionComponent} from '../navegacion/navegacion.component';
import {HeaderComponent} from '../header/header.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {LoginComponent} from '../login/login.component';
import {RegistroComponent} from '../registro/registro.component';
import {CatalogoComponent} from '../catalogo/catalogo.component';
import {ProductsComponent} from '../products/products.component';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {FormsModule} from '@angular/forms';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';

import * as Mocks from '../shared/mocks';
import { PerfilComponent } from '../perfil/perfil.component';
import { ViewProductComponent } from '../view-product/view-product.component';

describe('SalesComponent', () => {
  let component: SalesComponent;
  let fixture: ComponentFixture<SalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), FormsModule, ToastrModule.forRoot()],
      declarations: [
        SalesComponent,
        HomeComponent,
        NavegacionComponent,
        HeaderComponent,
        LoginComponent,
        RegistroComponent,
        CatalogoComponent,
        ProductsComponent,
        ProductDetailComponent,
        FileUploaderComponent,
        PerfilComponent,
        ViewProductComponent
      ],
      providers: [
        {provide: AngularFireAuth, useValue: Mocks.mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: Mocks.mockDatabase},
        {provide: AngularFireStorage, useValue: null}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', fakeAsync(() => {
    component.ngOnInit();
    tick(100);
    expect(component.products).toBeTruthy();
    expect(component.owner).toBeTruthy();
    expect(component.owner.length).toBeGreaterThan(0);
    expect(component.owner).not.toBe('');
  }));

  it('should render app-navegacion tag', () => {
    const fixture = TestBed.createComponent(SalesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navegacion').textContent).toBeDefined();
  });
});
