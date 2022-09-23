import { createAction, props } from '@ngrx/store';
import { Deck } from 'src/app/models/deck.model';
import { DeckInfo } from 'src/app/interfaces/deckInfo.interface';

export const createDeck = createAction(
  'CreateDeck',
  props<{ deck: DeckInfo }>()
);

export const createDeckSuccess = createAction(
  'CreateDeckSuccess',
  props<{ deck: Deck }>()
);

export const createDeckSuccessNavigate = createAction(
  'CreateDeckSuccessNavigate',
  props<{ deck: Deck }>()
);

export const createDeckFail = createAction('CreateDeckFail');

export const loadDeck = createAction('LoadDeck', props<{ id: number }>());

export const loadDeckSuccess = createAction(
  'LoadDeckdSuccess',
  props<{ deck: Deck[] }>()
);

export const loadDeckFail = createAction('LoadDeckFail');

export const deleteDeck = createAction('DeleteDeck', props<{ id: number }>());

export const deleteDeckSuccessNavigate = createAction(
  'DeleteDeckSuccessNavigate',
  props<{ id: number }>()
);

export const deleteDeckSuccess = createAction(
  'DeleteDeckSuccess',
  props<{ id: number }>()
);

export const deleteDeckFail = createAction('DeleteDeckFail');

export const deleteOwnedCard = createAction(
  'DeleteOwnedCard',
  props<{ id: number }>()
);

export const deleteOwnedCardSuccessNavigate = createAction(
  'DeleteOwnedCardSuccessNavigate',
  props<{ id: number }>()
);

export const deleteOwnedCardSuccess = createAction(
  'DeleteOwnedCardSuccess',
  props<{ id: number }>()
);

export const deleteOwnedCardFail = createAction('DeleteOwnedCardFail');
