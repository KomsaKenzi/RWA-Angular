import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card-service/card.service';
import { AppState } from 'src/app/store/app.state';
import { selectCards, selectCardID } from 'src/app/store/cards/cards.selectors';
import { Router } from '@angular/router';
import { setCardForDisplay, deleteCard } from 'src/app/store/cards/cards.actions';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() card: Card | null = null;
  cards: Card[] = [];
  showCards: Card[] = [];
  constructor(private router: Router, private store: Store<AppState>,private cardService: CardService) { }

  ngOnInit(): void {
        this.cardService
          .getCards()
          .subscribe((cards: Card[]) => {
            this.cards = cards;
            this.showCards = cards;
          });
      

  }

  createCard(){
      this.router.navigate(['createCard']);

  }

  editCard(card: Card){
    if (card) {
      this.store.dispatch(setCardForDisplay({ card }));
      this.router.navigate(['updateCard']);
    }
    
  }

  deleteCard(cards: Card){
    if (cards) {
      const id:number = cards.id;
      
      this.store.dispatch(deleteCard({ id }));
    }
  }
/*
deleteCard(){
    this.cardService
    .deleteCards(this.cards.id)
  }
  editCard(){
    this.cardService
          .updateCards()
          .subscribe((cards: Card[]) => {
            console.log(cards);
            this.cards = cards;
            this.showCards = cards;
          });
  }
  */
}
