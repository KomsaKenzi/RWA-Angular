import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsUpdateComponent } from './cards-update.component';

describe('CardsUpdateComponent', () => {
  let component: CardsUpdateComponent;
  let fixture: ComponentFixture<CardsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
