import { Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ProductItemComponent} from './products/product-item/product-item.component';

export const routes: Routes = [
  {
    path: 'product',
    component: ProductsComponent,
  },
  {
    path: 'product/:action',
    component: ProductItemComponent,
  }
];
