import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as ShopActions from '../../store/shop/shop.actions';
import { Shop } from '../../models/shop.model';
import { selectCardForDisplay } from '../../store/cards/cards.selectors';
import { UpdateShop } from '../../interfaces/updateShop.interface';
import { selectShopForDisplay, selectShopForDisplayState } from 'src/app/store/shop/shop.selectors';


@Component({
  selector: 'app-shop-update-card',
  templateUrl: './shop-update-card.component.html',
  styleUrls: ['./shop-update-card.component.css']
})
export class ShopUpdateCardComponent implements OnInit {

  @Input() shop: Shop | null = null;
  constructor(private router: Router, private store: Store<AppState>) {}

  text: string = '';
  price: number = 0;
  id: number = -1;

  ngOnInit(): void {
    this.store.select(selectShopForDisplay).subscribe((data) => {
      this.shop = data;
      if (this.shop) {
        this.text = this.shop.text;
        this.price = this.shop.price;
        this.id=this.shop.id;
      }
    });
  }
  
  updateShop() {
    const data: UpdateShop = {
      id: this.id,
      price: this.price,
      text: this.text,
    };
    this.store.dispatch(ShopActions.updateShop({ data }));
  }

  setText(text: string) {
    this.text = text;
  }

  setPrice(price: string) {
    this.price = Number(price);
  }

  backButton() {
    this.router.navigate(['shop']);
  }
}
