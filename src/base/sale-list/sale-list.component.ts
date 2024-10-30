import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URLS} from '../../shared/urls';
import {Observable} from 'rxjs';
import {HttpOptions} from '../../shared/http/http-options';
import {Sale} from '../../shared/models/sale';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {BaseService} from '../../shared/services/base.service';

@Component({
  selector: 'app-sale-list',
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
  templateUrl: './sale-list.component.html',
  styleUrl: './sale-list.component.css'
})
export class SaleListComponent  implements OnInit{
  public dataSource: Sale[] = [];
  public displayedColumns:string[] = ['id', 'nrf', 'employee','product','client','actions'];
  public searchValue:string = '';
  public searchNRF: string = '';

  // @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;


  private service: BaseService<Sale>;


  constructor(private http: HttpClient) {
    this.service = new BaseService<Sale>(http,URLS.SALE);
  }


  public ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter();
    this.service.addParameter('nrf',this.searchNRF);
    this.service.addParameter('employee__id', this.searchValue);
    this.service.getAll().subscribe({
      next: (data: Sale[]) => {
        this.dataSource = data;
      },
      error: (_) => {
        console.error('Error loading sales');
      }
    });
  }

  // public deleteObject(id: number):void{
  //   this.delete(id,URLS.SALE).subscribe({
  //     next:(_:any):void =>{
  //       this.search();
  //     },
  //     error: (_:any):void =>{
  //       console.error('Error delete sales');
  //     }
  //   })
  // }
}
