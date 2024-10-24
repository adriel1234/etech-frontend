import {Component, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {Product} from '../../shared/models/product';
import {Observable} from 'rxjs';
import {URLS} from '../../shared/urls';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatTableModule,
    MatCard,
    MatButton
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public dataSource: Product[] = [];
  public displayedColumns: string[] = ['id', 'description', 'quantity'];

  constructor(private http: HttpClient) {
  }

  public ngOnInit(): void {
    this.getAll(URLS.PRODUCT).subscribe({
      next: (data: Product[]) => {
        this.dataSource = data;
      },
      error: (err) => {
        console.error('Error loading products');
      }
    });
  }

  public getAll(route: string): Observable<Product[]> {
    const url = 'http://localhost:8000' + route;
    return this.http.get<Product[]>(url, {});
  }
}
