import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface User{
  name: string,
  email: string,
  password: string;
}
@Component({
  selector: 'app-login-filho',
  standalone: true,
  imports: [],
  templateUrl: './login-filho.component.html',
  styleUrl: './login-filho.component.css'
})
export class LoginFilhoComponent {
  public logged: boolean = false;
  @Input() public userLogin: User = {
    name: '',
    email: '',
    password: ''};

  private emailFilho: string = 'admin@admin.com';
  private senhaFilhor: string = 'admin';

  // @Output() public changeMessage: EventEmitter<string> = new EventEmitter<string>();

  public Loged(): void {
    if (this.userLogin.email== this.emailFilho && this.userLogin.password== this.senhaFilhor){
      this.logged = true;
    }else{
      this.logged = false;
    }
  }

}
