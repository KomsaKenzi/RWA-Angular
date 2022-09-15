import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormaComponent } from './register-forma.component';

describe('RegisterFormaComponent', () => {
  let component: RegisterFormaComponent;
  let fixture: ComponentFixture<RegisterFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
