import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {routes} from '../app-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginComponent} from '../login/login.component';
import {RegistroComponent} from '../registro/registro.component';
import {FormsModule, NgForm} from '@angular/forms';
import {NavegacionComponent} from '../navegacion/navegacion.component';
import {CatalogoComponent} from '../catalogo/catalogo.component';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {ToastrModule} from 'ngx-toastr';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import {ProductsComponent} from '../products/products.component';
import {ProductDetailComponent} from '../product-detail/product-detail.component';

import * as Mocks from '../shared/mocks';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        LoginComponent,
        RegistroComponent,
        NavegacionComponent,
        CatalogoComponent,
        FileUploaderComponent,
        ProductsComponent,
        ProductDetailComponent
      ],
      imports: [FormsModule, RouterTestingModule.withRoutes(routes), ToastrModule.forRoot()],
      providers: [
        {provide: AngularFireAuth, useValue: Mocks.mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: Mocks.mockDatabase},
        {provide: AngularFireStorage, useValue: null}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-navegacion tag', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navegacion').textContent).toBeDefined();
  });
});
