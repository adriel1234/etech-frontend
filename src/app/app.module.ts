import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {ProductItemComponent} from './products/product-item/product-item.component';
import {ProductsComponent} from './products/products.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductItemComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  bootstrap:[AppComponent]
})
export class AppModule { }
