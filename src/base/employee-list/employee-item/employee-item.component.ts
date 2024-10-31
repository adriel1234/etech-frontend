import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Product} from '../../../shared/models/product';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';
import {BaseComponent} from '../../base.component';
import {Employee} from '../../../shared/models/employee';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-employee-item',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './employee-item.component.html',
  styleUrl: './employee-item.component.css'
})
export class EmployeeItemComponent extends BaseComponent<Employee> implements OnInit{
  public formGroup: FormGroup;
  public object: Employee = new Employee();


  constructor(http: HttpClient) {
    super(http, URLS.EMPLOYEE)
  }

  public ngOnInit(): void{
    this.formGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      registration: new FormControl('',[Validators.required])
    });
  }


  public saveOrUpdate():void{
    if(this.formGroup.valid){
      Object.keys(this.formGroup.getRawValue()).forEach((key:string)=>{
        const value = this.formGroup.getRawValue()[key];
        if(value !== null && value !== undefined){
          this.object[key] = value;
        }
      });

      this.service.save(this.object).subscribe((response)=>{
        this.goToPage('employee');
        console.log(response);
      });
    }

  }

}
