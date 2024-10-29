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
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';

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

  private parameters: HttpParams = new HttpParams();


  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.clearParameters();
    this.addParameter('nrf',this.searchNRF);
    this.addParameter('employee__id', this.searchValue);
    this.getAll<Sale>(URLS.SALE).subscribe({
      next: (data: Sale[]) => {
        this.dataSource = data;
      },
      error: (_) => {
        console.error('Error loading sales');
      }
    });
  }

  public deleteObject(id: number):void{
    this.delete(id,URLS.SALE).subscribe({
      next:(_:any):void =>{
        this.search();
      },
      error: (_:any):void =>{
        console.error('Error delete sales');
      }
    })
  }
  //service

  public getAll<T>(route: string): Observable<T[]> {
    const url = URLS.BASE + route;
    return this.http.get<T[]>(url,this.getOptions());
  }

  public delete(id:number | string, route:string):Observable<any>{
    this.clearParameters();
    const url = URLS.BASE + route + id;

    return this.http.delete<any>(url,this.getOptions());
  }

  public save<T>(entity: T, route:string): Observable<T> {
    this.clearParameters();
    const url = URLS.BASE + route;
    return this.http.post<T>(url,entity,this.getOptions()) as Observable<T>;
  }

  public update<T>(id:number | string,entity: any): Observable<T> {
    this.clearParameters();
    const url = URLS.BASE+id+'/';
    return this.http.patch<T>(url,entity,this.getOptions()) as Observable<T>;
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
