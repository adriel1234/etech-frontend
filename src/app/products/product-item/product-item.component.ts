import {Component, Injector, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../../shared/models/product';
import {URLS} from '../../../shared/urls';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent  implements OnInit{
  public data: Product = {} as Product;
  constructor(private http: HttpClient, private injector:Injector) {
    this.http = injector.get(HttpClient)

  }

  public ngOnInit() {
    this.fetchData(1);
  }

  fetchData(id: number){
    this.http.get<Product>(URLS.PRODUCT+id)
      .subscribe({
        next:(data:Product)=>{
          this.data = data;
          console.log(this.data);
        },
        error:(error:any)=>{
          console.error('There wa an error!', error);
        },
        complete:()=>{
          console.log('Completed!');
        }
      });
  }

}
