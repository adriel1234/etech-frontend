import { Routes } from '@angular/router';
import {ProductListComponent} from '../base/product-list/product-list.component';
import {ClientListComponent} from '../base/client-list/client-list.component';

export const routes: Routes = [
  {
    path: 'product',
    component: ProductListComponent,
  },
  {
    path: 'client',
    component: ClientListComponent,
  }
];
