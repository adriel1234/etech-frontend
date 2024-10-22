import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExemploFilhoComponent} from '../exemplo-filho/exemplo-filho.component';
import {LoginFilhoComponent} from '../login-filho/login-filho.component';


export interface User{
  name: string,
  email: string,
  password: string;
}
@Component({
  selector: 'app-login-pai',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ExemploFilhoComponent,
    LoginFilhoComponent
  ],
  templateUrl: './login-pai.component.html',
  styleUrl: './login-pai.component.css'
})
export class LoginPaiComponent {

  public name: string = '';
  public email: string = '';
  public password: string = '';
  public userll:User = {} as User;
  public userLogin:User = {
    name: '',
    email: '',
    password:''
  }
  public sendLogin(){
    this.userLogin={
      name: this.name,
      email: this.email,
      password: this.password
    };

    console.log(this.userLogin);

  }

}
