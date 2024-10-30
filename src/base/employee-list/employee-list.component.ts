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
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseService} from '../../shared/services/base.service';
import {Product} from '../../shared/models/product';

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
    MatButton,
    MatFabButton
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  public dataSource: Employee[] = [];
  public displayedColumns:string[] = ['id', 'name', 'registration','actions'];
  public searchValue:string = '';
  public searchRegistration: string = '';

  // @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  // private router:Router = new Router();

  private service: BaseService<Employee>;


  constructor(private http: HttpClient) {
    this.service = new BaseService<Employee>(http,URLS.EMPLOYEE);
  }

  public ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter();
    this.service.addParameter('name',this.searchRegistration);
    this.service.addParameter('registration', this.searchValue);
    this.service.getAll().subscribe({
      next: (data: Employee[]) => {
        this.dataSource = data;
      },
      error: (_) => {
        console.error('Error loading Employees');
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
}

