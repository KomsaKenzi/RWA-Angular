import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddCardComponent } from './shop-add-card.component';

describe('ShopAddCardComponent', () => {
  let component: ShopAddCardComponent;
  let fixture: ComponentFixture<ShopAddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopAddCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
