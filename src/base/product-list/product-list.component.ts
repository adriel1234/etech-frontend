import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Product } from '../../shared/models/product';
import { Observable } from 'rxjs';
import { URLS } from '../../shared/urls';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {HttpOptions} from '../../shared/http/http-options';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatCard,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatIconButton,
    MatInput,
    MatIcon,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public dataSource: Product[] = [];
  public displayedColumns:string[] = ['id', 'description', 'quantity'];
  public searchValue:string = '';

  private parameters: HttpParams = new HttpParams();

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.clearParameters();
    this.addParameter('description', this.searchValue);
    this.getAll<Product>(URLS.PRODUCT).subscribe({
      next: (data: Product[]) => {
        this.dataSource = data;
      },
      error: (_) => {
        console.error('Error loading products');
      }
    });
  }

  public getAll<T>(route: string): Observable<T[]> {
    const url = URLS.BASE + route;
    return this.http.get<T[]>(url,this.getOptions());
  }

  public addParameter(key: string, value: string): void {
    this.parameters = this.parameters.set(key, value);
  }

  public clearParameters(): void {
    this.parameters = new HttpParams();
  }

  public getOptions(): HttpOptions {
    const httpOptions: HttpOptions = {}
    if(this.parameters){
      httpOptions.params = this.parameters;
    }
    return  httpOptions;
  }


}
