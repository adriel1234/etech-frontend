import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploPaiComponent } from './exemplo-pai.component';

describe('ExemploPaiComponent', () => {
  let component: ExemploPaiComponent;
  let fixture: ComponentFixture<ExemploPaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemploPaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExemploPaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
