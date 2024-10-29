import {Component, OnInit} from '@angular/core';
import {Employee} from '../../shared/models/employee';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URLS} from '../../shared/urls';
import {Observable} from 'rxjs';
import {HttpOptions} from '../../shared/http/http-options';
import {MatCard} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatRow,
    MatRowDef,
    MatSuffix,
    MatTable,
    ReactiveFormsModule,
    FormsModule,
    MatHeaderCellDef,
    MatButton
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  public dataSource: Employee[] = [];
  public displayedColumns:string[] = ['id', 'name', 'registration'];
  public searchValue:string = '';
  public searchRegistration: string = '';

  // @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;

  private parameters: HttpParams = new HttpParams();


  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.clearParameters();
    this.addParameter('name',this.searchRegistration);
    this.addParameter('registration', this.searchValue);
    this.getAll<Employee>(URLS.EMPLOYEE).subscribe({
      next: (data: Employee[]) => {
        this.dataSource = data;
      },
      error: (_) => {
        console.error('Error loading Employees');
      }
    });
  }

  public deleteObject(id: number):void{
    this.delete(id,URLS.EMPLOYEE).subscribe({
      next:(_:any):void =>{
        this.search();
      },
      error: (_:any):void =>{
        console.error('Error delete Employees');
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

