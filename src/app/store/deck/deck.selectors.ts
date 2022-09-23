import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardsState } from 'src/app/state/cardsState.state';
import { Card } from 'src/app/models/card.model';
import { CardForDisplayState } from 'src/app/state/cardForDisplayState.state';
import { DeckState } from 'src/app/state/deckState.state';

export const selectDecksState = createFeatureSelector<DeckState>('decksState');

export const selectDecks = createSelector(
  selectDecksState,
  (state: DeckState) => {
    return state.ids.map((id: number | string) => state.entities[id]);
  }
);

export const selectDeckID = createSelector(
  selectDecksState,
  (state: DeckState) => {
    return state.selectedDeck;
  }
);
