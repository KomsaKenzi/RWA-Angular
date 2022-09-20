import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ShopInfo } from 'src/app/interfaces/shopInfo.interface';
import * as ShopActions from '../../store/shop/shop.actions';
import { CardService } from 'src/app/services/card-service/card.service';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-shop-add-card',
  templateUrl: './shop-add-card.component.html',
  styleUrls: ['./shop-add-card.component.css'],
})
export class ShopAddCardComponent implements OnInit {
  @Input() card: Card | null = null;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private cardService: CardService
  ) {}
  text: string = '';
  price: number = 0;
  cardID: number = 0;
  cards: Card[] = [];
  showCards: Card[] = [];
  ngOnInit(): void {
    this.cardService.getCards().subscribe((cards: Card[]) => {
      this.cards = cards;
      this.showCards = cards;
    });
  }

  createShopCard() {
    const shop: ShopInfo = {
      text: this.text,
      price: this.price,
      cardId: this.cardID,
    };
    this.store.dispatch(ShopActions.createShop({ shop }));
  }

  setPrice(price: string) {
    this.price = Number(price);
  }

  setText(text: string) {
    this.text = text;
  }

  backButton() {
    this.router.navigate(['shop']);
  }

  setCard(value: string) {
    this.cardID = Number(value);
  }
}
