import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {UserService} from './shared/user.service';

// Firebase
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import {RegistroComponent} from './registro/registro.component';
import {RouteGuard} from './shared/route-guard';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {NavegacionComponent} from './navegacion/navegacion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    HeaderComponent,
    NavegacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule
  ],
  // exports: [NavegacionComponent],
  providers: [UserService, RouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
