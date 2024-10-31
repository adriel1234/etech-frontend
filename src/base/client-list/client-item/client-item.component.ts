import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BaseComponent} from '../../base.component';
import {Employee} from '../../../shared/models/employee';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';
import {Client} from '../../../shared/models/client';

@Component({
  selector: 'app-client-item',
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
  templateUrl: './client-item.component.html',
  styleUrl: './client-item.component.css'
})
export class ClientItemComponent extends BaseComponent<Client> implements OnInit{
  public formGroup: FormGroup;
  public object: Client = new Client();


  constructor(http: HttpClient) {
    super(http, URLS.CLIENT)
  }

  public ngOnInit(): void{
    this.formGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      age: new FormControl('',[Validators.required]),
      rg: new FormControl('',[Validators.required]),
      cpf: new FormControl('',[Validators.required])
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
        this.goToPage('client');
        console.log(response);
      });
    }

  }

}
