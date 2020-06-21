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

describe('SalesComponent', () => {
  let component: SalesComponent;
  let fixture: ComponentFixture<SalesComponent>;

  const datosUsuario = {
    uid: 'usuarioPrueba'
  };

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
        SalesComponent,
        HomeComponent,
        NavegacionComponent,
        HeaderComponent,
        LoginComponent,
        RegistroComponent,
        CatalogoComponent,
        ProductsComponent,
        ProductDetailComponent,
        FileUploaderComponent
      ],
      providers: [
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: mockDatabase},
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
    // console.log('component.author: ', component.author);
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
