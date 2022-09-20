import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Card } from 'src/app/models/card.model';
import { CardsState } from 'src/app/state/cardsState.state';
import { CardForDisplayState } from 'src/app/state/cardForDisplayState.state';
import * as CardsActions from './cards.actions';

declare var bootbox: any;

const adapter: EntityAdapter<Card> = createEntityAdapter<Card>();

export const cardsInitialState = adapter.getInitialState({
  selectedCard: -1,
});

const _cardsReducer = createReducer(
  cardsInitialState,

  on(
    CardsActions.createCardSuccess,
    (state: CardsState, { card }) => {
      bootbox.alert(`Card "${card.name}" posted!`);
      return adapter.addOne(card, state);
    }
  ),
  on(
    CardsActions.updateCardSuccess,
    (state: CardsState, { card }) => {
      bootbox.alert('Card successfully updated!');
      return adapter.updateOne(
        {
          id: card.id,
          changes: {
            name: card.name,
            attack: card.attack,
            defence: card.defence,
            description: card.description,
          },
        },
        state
      );
    }
  ),


  on(CardsActions.updateCardFail, (state: CardsState) => {
    bootbox.alert(
      'Error occured while updating an card, please try again later!'
    );
    return state;
  }),

  on(CardsActions.deleteCardSuccess, (state: CardsState, { id }) => {
    return adapter.removeOne(id, state);
  }),

  on(CardsActions.deleteCardFail, (state: CardsState) => {
    bootbox.alert(
      'An error occured while deleting card, try again later!'
    );
    return state;
  }),

 
);

export const initialCardForShowState: CardForDisplayState = {
  card: null,
};

const _cardsForDisplayReducer = createReducer(
  initialCardForShowState,
  on(
    CardsActions.setCardForDisplay,
    (state: CardForDisplayState, { card }) => {
      return {
        ...state,
        card: card,
      };
    }
  ),


);
export function CardForDisplayReducer(
  state: CardForDisplayState | undefined,
  action: Action
) {
  return _cardsForDisplayReducer(state, action);
}



export function CardsReducer(
  state: CardsState | undefined,
  action: Action
) {
  return _cardsReducer(state, action);
}