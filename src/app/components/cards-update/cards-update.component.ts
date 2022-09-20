import { Component, Input, OnInit } from '@angular/core';
import { CardInfo } from 'src/app/interfaces/cardInfo.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as CardsActions from '../../store/cards/cards.actions';
import { Card } from '../../models/card.model';
import { selectCardForDisplay } from '../../store/cards/cards.selectors';
import { UpdateCards } from '../../interfaces/updateCards.interface';

@Component({
  selector: 'app-cards-update',
  templateUrl: './cards-update.component.html',
  styleUrls: ['./cards-update.component.css'],
})
export class CardsUpdateComponent implements OnInit {
  @Input() card: Card | null = null;
  constructor(private router: Router, private store: Store<AppState>) {}

  name: string = '';
  attack: number = 0;
  defence: number = 0;
  description: string = '';
  id: number = -1;

  ngOnInit(): void {
    this.store.select(selectCardForDisplay).subscribe((data) => {

      this.card = data;
      console.log(this.card);
      if (this.card) {
        this.name = this.card.name;
        this.attack = this.card.attack;
        this.defence = this.card.defence;
        this.description = this.card.description;
        this.id=this.card.id;
      }
    });
  }
  
  updateCard() {
    const data: UpdateCards = {
      id: this.id,
      name: this.name,
      attack: this.attack,
      defence: this.defence,
      description: this.description,
    };
    console.log(data);
    this.store.dispatch(CardsActions.updateCard({ data }));
  }

  setName(name: string) {
    this.name = name;
  }

  setAttack(attack: string) {
    this.attack = Number(attack);
  }

  setDefence(defence: string) {
    this.defence = Number(defence);
  }

  setDescription(description: string) {
    this.description = description;
  }

  backButton() {
    this.router.navigate(['cards']);
  }
}
