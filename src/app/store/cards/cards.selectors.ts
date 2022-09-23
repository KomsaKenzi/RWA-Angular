import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardsState } from 'src/app/state/cardsState.state';
import { Card } from 'src/app/models/card.model';
import { CardForDisplayState } from 'src/app/state/cardForDisplayState.state';

export const selectCardsState = createFeatureSelector<CardsState>('cardsState');

export const selectCardsForDisplayState =
  createFeatureSelector<CardForDisplayState>('cardForDisplay');

export const selectCards = createSelector(
  selectCardsState,
  (state: CardsState) => {
    return state.ids.map((id: number | string) => state.entities[id]);
  }
);

export const selectCardID = createSelector(
  selectCardsState,
  (state: CardsState) => {
    return state.selectedCard;
  }
);

export const selectCardSelected = createSelector(
  selectCards,
  selectCardID,
  (cards, id) => {
    return cards.find((card) => {
      if (card && card.id == id) return true;
      else return false;
    });
  }
);

export const selectCardForDisplay = createSelector(
  selectCardsForDisplayState,
  (state: CardForDisplayState) => state.card
);
