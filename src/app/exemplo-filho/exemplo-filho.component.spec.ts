import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploFilhoComponent } from './exemplo-filho.component';

describe('ExemploFilhoComponent', () => {
  let component: ExemploFilhoComponent;
  let fixture: ComponentFixture<ExemploFilhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemploFilhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExemploFilhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
