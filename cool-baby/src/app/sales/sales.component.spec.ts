import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SalesComponent } from './sales.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from '../home/home.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { NavegacionComponent } from '../navegacion/navegacion.component';
import { HeaderComponent } from '../header/header.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { CatalogoComponent } from '../catalogo/catalogo.component';


describe('SalesComponent', () => {
  let component: SalesComponent;
  let fixture: ComponentFixture<SalesComponent>;

  const datosUsuario = {
    uid: 'patito'
  };

  const mockAngularFireAuth: any = {
    currentUser: Promise.resolve(datosUsuario)
  };

  const mockDatabase: any = {
    list() {
      return {
        snapshotChanges() {
          return {subscribe() {}};
        }
      };
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
        SalesComponent,
        HomeComponent,
        FileUploaderComponent,
        NavegacionComponent,
        HeaderComponent,
        LoginComponent,
        RegistroComponent,
        CatalogoComponent
      ],
      providers: [
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: mockDatabase},
        {provide: AngularFireStorage, useValue: null}
      ]
    })
    .compileComponents();
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

  it('should upload', () => {
    const dummyUrl = 'url de prueba';
    component.onImagePicked(dummyUrl);
    expect(component.uploadedFileUrl).toBe(dummyUrl);
  });

  it('should submit form', () => {
    const testForm = {
      reset() {},
      value: {
        title: 'blah',
        content: 'lorem ipsum'
      }
    } as NgForm;

    const resetSpy: jasmine.Spy = spyOn(testForm, 'reset');

    component.onSubmit(testForm);

    expect(resetSpy).toHaveBeenCalled();
    expect(resetSpy.calls.all().length).toEqual(1);
  });
});
