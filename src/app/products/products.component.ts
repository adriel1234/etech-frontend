import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatTable, MatTableModule
} from '@angular/material/table';
import {Product} from '../../shared/models/product';

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
export class ProductsComponent {
  public dataSource: Product[] = [];
  displayedColumns: string[] = ['description', 'quantity'];

}
