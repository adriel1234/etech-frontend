import {Component, OnInit} from '@angular/core';
import {ExemploFilhoComponent} from '../exemplo-filho/exemplo-filho.component';
import {FormsModule} from '@angular/forms';
import {LoginFilhoComponent} from '../login-filho/login-filho.component';

@Component({
  selector: 'app-exemplo-pai',
  standalone: true,
  imports: [
    ExemploFilhoComponent,
    FormsModule,
    LoginFilhoComponent
  ],
  templateUrl: './exemplo-pai.component.html',
  styleUrl: './exemplo-pai.component.css'
})
export class ExemploPaiComponent implements OnInit {
  public messagePai: string= '';
  constructor() {
  }
  ngOnInit(){
    this.messagePai = "hello world!";
  }
  public changeMessagePai(messageFilho: string):void{
    this.messagePai = messageFilho;
  }
}
