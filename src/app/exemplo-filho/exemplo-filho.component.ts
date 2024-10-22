import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-exemplo-filho',
  standalone: true,
  imports: [],
  templateUrl: './exemplo-filho.component.html',
  styleUrl: './exemplo-filho.component.css'
})
export class ExemploFilhoComponent {
  @Input() public messageFilho: string = '';

  @Output() public changeMessage: EventEmitter<string> = new EventEmitter<string>();

  public changeMessageFilho(): void {
    this.changeMessage.emit('hello father!!');
  }
}
