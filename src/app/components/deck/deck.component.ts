import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdateBalance } from 'src/app/interfaces/updateBalance.interface';
import { Card } from 'src/app/models/card.model';
import { Deck } from 'src/app/models/deck.model';
import { OwnedCard } from 'src/app/models/ownedCard.model';
import { Shop } from 'src/app/models/shop.model';
import { CardService } from 'src/app/services/card-service/card.service';
import { DeckService } from 'src/app/services/deck/deck.service';
import { ShopService } from 'src/app/services/shop-service/shop.service';
import { AppState } from 'src/app/store/app.state';
import { selectUserData } from 'src/app/store/user/user.selectors';
import * as DeckActions from '../../store/deck/deck.actions';
import * as UserActions from '../../store/user/user.actions';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
})
export class DeckComponent implements OnInit {
  @Input() card: Card | null = null;
  cards: OwnedCard[] = [];
  showCards: OwnedCard[] = [];
  shops: Shop[] = [];
  decks: Deck[] = [];
  userID: number = 0;
  cardDeck: Card | null = null;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private cardService: CardService,
    private shopService: ShopService,
    private deckService: DeckService
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
      });

    this.shopService.getShops().subscribe((shopz: Shop[]) => {
      this.shops = shopz;
    });

    this.deckService.getDeck(this.userID).subscribe((decks: Deck[]) => {
      this.decks = decks;
    });
  }

  createCard() {
    this.router.navigate(['createCard']);
  }

  levelCard(cardz: OwnedCard) {
    console.log(cardz.card.level);
  }

  sellCard(karta: OwnedCard) {
    const id = karta.card.id;
    const cena = this.shops.filter((x) => x.card.id === id);
    const data: UpdateBalance = {
      id: this.userID,
      price: -cena[0].price / 2,
    };
    const uzas = {
      id: karta.id,
    };
    this.store.dispatch(DeckActions.deleteOwnedCard(uzas));
    this.store.dispatch(UserActions.updateBalance({ data }));
  }

  backButton() {
    this.router.navigate(['home']);
  }

  createDeck() {
    this.router.navigate(['createDeck']);
  }

  deleteDeck(id: number) {
    if (id) {
      this.store.dispatch(DeckActions.deleteDeck({ id }));
    }
  }
}
