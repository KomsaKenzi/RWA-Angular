import { Component, OnInit } from '@angular/core';
import { CardInfo } from 'src/app/interfaces/cardInfo.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as CardsActions from '../../store/cards/cards.actions';

@Component({
  selector: 'app-cards-create',
  templateUrl: './cards-create.component.html',
  styleUrls: ['./cards-create.component.css'],
})
export class CardsCreateComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}
  name: string = '';
  attack: number = 0;
  defence: number = 0;
  description: string = '';
  ngOnInit(): void {}
  createCard() {
    const card: CardInfo = {
      name: this.name,
      attack: this.attack,
      defence: this.defence,
      description: this.description,
    };

    this.store.dispatch(CardsActions.createCard({ card }));
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
