import { createAction, props } from '@ngrx/store';
import { Card } from 'src/app/models/card.model';
import { UpdateCards } from '../../interfaces/updateCards.interface';
import { CardInfo } from '../../interfaces/cardInfo.interface';

export const createCard = createAction(
  'CreateCard',
  props<{ card: CardInfo }>()
);

export const createCardSuccess = createAction(
  'CreateCardSuccess',
  props<{ card: Card }>()
);

export const createCardSuccessNavigate = createAction(
  'CreateCardSuccessNavigate',
  props<{ card: Card }>()
);

export const createCardFail = createAction('CreateCardFail');

export const loadCard = createAction('LoadCard', props<{ id: number }>());

export const loadCardSuccess = createAction(
  'LoadCardSuccess',
  props<{ card: Card[] }>()
);

export const loadCardFail = createAction('LoadCardFail');

export const setCardForDisplay = createAction(
  'SetCardForDisplay',
  props<{ card: Card }>()
);

export const updateCard = createAction(
  'UpdateCard',
  props<{ data: UpdateCards }>()
);

export const updateCardSuccess = createAction(
  'UpdateCardSuccess',
  props<{ card: Card }>()
);

export const updateCardFail = createAction('UpdateCardFail');

export const deleteCard = createAction('DeleteCard', props<{ id: number }>());

export const deleteCardSuccessNavigate = createAction(
  'DeleteCardSuccessNavigate',
  props<{ id: number }>()
);

export const deleteCardSuccess = createAction(
  'DeleteCardSuccess',
  props<{ id: number }>()
);

export const deleteCardFail = createAction('DeleteCardFail');
