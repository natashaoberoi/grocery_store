
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

import { HomeComponent } from './component/home/home.component';

import { HelpContactComponent } from './component/help-contact/help-contact.component';





import { ProductsComponent } from './component/products/products.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { OrdersComponent } from './component/orders/orders.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { AddOrderComponent } from './component/add-order/add-order.component';





const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'addproducts', component: AddProductComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orderdetails/:id', component: OrderDetailComponent },
  { path: 'addorder', component: AddOrderComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
