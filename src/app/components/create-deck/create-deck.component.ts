import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DeckInfo } from 'src/app/interfaces/deckInfo.interface';
import { Card } from 'src/app/models/card.model';
import { OwnedCard } from 'src/app/models/ownedCard.model';
import { ShopService } from 'src/app/services/shop-service/shop.service';
import { AppState } from 'src/app/store/app.state';
import { selectUserData } from 'src/app/store/user/user.selectors';
import * as DecksActions from '../../store/deck/deck.actions';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css'],
})
export class CreateDeckComponent implements OnInit {
  @Input() card: Card | null = null;
  cards: OwnedCard[] = [];
  showCards: OwnedCard[] = [];
  notSelectedCards1: OwnedCard[] = [];
  notSelectedCards2: OwnedCard[] = [];
  notSelectedCards3: OwnedCard[] = [];
  userID: number = 0;
  card1ID: number = -1;
  card2ID: number = -1;
  card3ID: number = -1;
  name: string = '';
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.store.select(selectUserData).subscribe((data) => {
      if (data && data.id) {
        this.userID = data.id;
      }
    });
    this.shopService
      .getOwnedCardsForId(this.userID)
      .subscribe((cards: OwnedCard[]) => {
        this.cards = cards;
        this.showCards = cards;
        this.getsSelectedCards1();
        this.getsSelectedCards2();
        this.getsSelectedCards3();
      });
  }

  getsSelectedCards1() {
    this.notSelectedCards1 = this.showCards.filter(
      (x) => x.id != this.card2ID && x.id != this.card3ID
    );
  }
  getsSelectedCards2() {
    this.notSelectedCards2 = this.showCards.filter(
      (x) => x.id != this.card1ID && x.id != this.card3ID
    );
  }
  getsSelectedCards3() {
    this.notSelectedCards3 = this.showCards.filter(
      (x) => x.id != this.card1ID && x.id != this.card2ID
    );
  }
  setCard1(value: string) {
    this.card1ID = Number(value);
    this.getsSelectedCards2();
    this.getsSelectedCards3();
  }

  setCard2(value: string) {
    this.card2ID = Number(value);
    this.getsSelectedCards1();
    this.getsSelectedCards3();
  }

  setCard3(value: string) {
    this.card3ID = Number(value);
    this.getsSelectedCards2();
    this.getsSelectedCards1();
  }

  setName(value: string) {
    this.name = value;
  }

  save() {
    {
      const deck: DeckInfo = {
        name: this.name,
        card1: this.card1ID,
        card2: this.card2ID,
        card3: this.card3ID,
        userId: this.userID,
      };
      this.store.dispatch(DecksActions.createDeck({ deck }));
    }
  }

  discard() {
    this.router.navigate(['deck']);
  }
}
