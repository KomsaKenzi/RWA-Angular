import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Card } from 'src/app/models/card.model';
import { CardsState } from 'src/app/state/cardsState.state';
import { CardForDisplayState } from 'src/app/state/cardForDisplayState.state';
import * as DecksActions from './deck.actions';
import { Deck } from 'src/app/models/deck.model';
import { DeckState } from 'src/app/state/deckState.state';

declare var bootbox: any;

const adapter: EntityAdapter<Deck> = createEntityAdapter<Deck>();

export const decksInitialState = adapter.getInitialState({
  selectedDeck: -1,
});

const _decksReducer = createReducer(
  decksInitialState,

  on(DecksActions.createDeckSuccess, (state: DeckState, { deck }) => {
    bootbox.alert(`Deck "${deck.name}" posted!`);
    return adapter.addOne(deck, state);
  }),

  on(DecksActions.deleteDeckSuccess, (state: DeckState, { id }) => {
    return adapter.removeOne(id, state);
  }),

  on(DecksActions.deleteDeckFail, (state: DeckState) => {
    bootbox.alert('An error occured while deleting deck, try again later!');
    return state;
  })
);

export function DecksReducer(state: DeckState | undefined, action: Action) {
  return _decksReducer(state, action);
}
