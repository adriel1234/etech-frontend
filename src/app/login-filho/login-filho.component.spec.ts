import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFilhoComponent } from './login-filho.component';

describe('LoginFilhoComponent', () => {
  let component: LoginFilhoComponent;
  let fixture: ComponentFixture<LoginFilhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFilhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFilhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
