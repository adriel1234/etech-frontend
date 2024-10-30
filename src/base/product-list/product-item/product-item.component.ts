import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Product} from '../../../shared/models/product';
import {BaseService} from '../../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';
import {MatError, MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatError,
    MatButton,
    // Add this if required

  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  public formGroup: FormGroup;
  public object: Product = new Product();

  private service: BaseService<Product>;

  constructor(http: HttpClient) {
    this.service = new BaseService<Product>(http, URLS.PRODUCT);
  }

  public ngOnInit(): void{
    this.formGroup = new FormGroup({
      description: new FormControl('',[Validators.required]),
      quantity: new FormControl('',[Validators.required])
    });
  }

  public saveOrUpdate():void{

  }

}
