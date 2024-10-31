import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BaseComponent} from '../../base.component';
import {Client} from '../../../shared/models/client';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';
import {Sale} from '../../../shared/models/sale';

@Component({
  selector: 'app-sale-item',
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
  templateUrl: './sale-item.component.html',
  styleUrl: './sale-item.component.css'
})
export class SaleItemComponent extends BaseComponent<Sale> implements OnInit{
  public formGroup: FormGroup;
  public object: Sale = new Sale();


  constructor(http: HttpClient) {
    super(http, URLS.SALE)
  }

  public ngOnInit(): void{
    this.formGroup = new FormGroup({
      nrf: new FormControl('',[Validators.required]),
      employee: new FormControl('',[Validators.required]),
      product: new FormControl('',[Validators.required]),
      client: new FormControl('',[Validators.required])
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
        this.goToPage('sale');
        console.log(response);
      });
    }

  }

}
