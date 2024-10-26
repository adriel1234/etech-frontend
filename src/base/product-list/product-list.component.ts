import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/models/product';
import { Observable } from 'rxjs';
import { URLS } from '../../shared/urls';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatCard,
    MatTableModule

  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public dataSource: Product[] = [];
  public displayedColumns = ['id', 'description', 'quantity'];
  public searchValue = '';

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.search();
  }

  public search(restIndex: boolean = false): void {
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
    return this.http.get<T[]>(url);
  }
}
