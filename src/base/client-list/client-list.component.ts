import {Component, OnInit} from '@angular/core';
import {Client} from '../../shared/models/client';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URLS} from '../../shared/urls';
import {Observable} from 'rxjs';
import {HttpOptions} from '../../shared/http/http-options';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-client-list',
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
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  public dataSource: Client[] = [];
  public displayedColumns:string[] = ['id', 'name', 'age','rg','cpf','actions'];
  public searchValue:string = '';
  public searchQtd: string = '';

  // @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;

  private parameters: HttpParams = new HttpParams();


  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.clearParameters();
    this.addParameter('age',this.searchQtd);
    this.addParameter('name', this.searchValue);
    this.getAll<Client>(URLS.CLIENT).subscribe({
      next: (data: Client[]) => {
        this.dataSource = data;
      },
      error: (_) => {
        console.error('Error loading Clients');
      }
    });
  }

  public deleteObject(id: number):void{
    this.delete(id,URLS.CLIENT).subscribe({
      next:(_:any):void =>{
        this.search();
      },
      error: (_:any):void =>{
        console.error('Error delete Client');
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
