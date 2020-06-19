import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegistroComponent} from './registro/registro.component';
import {RouteGuard} from './shared/route-guard';
import {CatalogoComponent} from './catalogo/catalogo.component';
import { SalesComponent } from './sales/sales.component';
import { ProductService } from './shared/product.service';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [RouteGuard]},
  {path: 'home', component: HomeComponent, canActivate: [RouteGuard]},
  {path: 'sales', component: SalesComponent, canActivate: [RouteGuard]},
  {path: 'products', component: ProductsComponent, canActivate: [RouteGuard]},
  {path: 'product-detail/:ownerName/:productId', component: ProductDetailComponent, canActivate: [RouteGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'catalogo', component: CatalogoComponent, canActivate: [RouteGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
