import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopUpdateCardComponent } from './shop-update-card.component';

describe('ShopUpdateCardComponent', () => {
  let component: ShopUpdateCardComponent;
  let fixture: ComponentFixture<ShopUpdateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopUpdateCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopUpdateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
