import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Product} from '../../../shared/models/product';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';
import { MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {BaseComponent} from '../../base_component';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent extends BaseComponent<Product> implements OnInit{
  public formGroup: FormGroup;
  public object: Product = new Product();


  constructor(http: HttpClient) {
    super(http, URLS.PRODUCT)
  }

  public ngOnInit(): void{
    this.formGroup = new FormGroup({
      description: new FormControl('',[Validators.required]),
      quantity: new FormControl('',[Validators.required])
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
        this.goToPage('product');
        console.log(response);
      });
    }

  }

}
