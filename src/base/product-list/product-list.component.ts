import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../../shared/models/product';
import {elementAt, Observable} from 'rxjs';
import {URLS} from '../../shared/urls';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {HttpOptions} from '../../shared/http/http-options';
import {MatPaginator} from '@angular/material/paginator';
import * as url from 'node:url';
import {BaseService} from '../../shared/services/base.service';
import {NavigationExtras, Router} from '@angular/router';

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
    MatPaginator,
    MatButton,
    MatFabButton,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public dataSource: Product[] = [];
  public displayedColumns: string[] = ['id', 'description', 'quantity', 'actions'];
  public searchValue: string = '';
  public searchQtd: string = '';

  // @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;

  private router:Router = new Router();

  private service: BaseService<Product>;


  constructor(private http: HttpClient) {
    this.service = new BaseService<Product>(http,URLS.PRODUCT);
  }

  public ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter();
    this.service.addParameter('quantity_gt', this.searchQtd);
    this.service.addParameter('description', this.searchValue);
    this.service.getAll().subscribe({
      next: (data: Product[]) => {
        this.dataSource = data;
      },
      error: (_) => {
        console.error('Error loading products');
      }
    });
  }

  public deleteObject(id:number): void{
    this.service.delete(id).subscribe({
      next:(_)=>{
        this.search();
      },
      error:(_)=>{
        console.error('Error deleting product');
      }
    });
  }

  public goToPage(route: string): void {
    const extras: NavigationExtras = {queryParamsHandling: 'merge'};
    this.router.navigate([route], extras).then();
  }

}
