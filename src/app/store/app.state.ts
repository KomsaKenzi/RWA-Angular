import { LogedUser } from '../interfaces/logedUser.interface';
import { UserReducer } from './user/user.reducer';
import { CardsReducer, CardForDisplayReducer } from './cards/cards.reducer';
import { CardForDisplayState } from '../state/cardForDisplayState.state';
import { ShopForDisplayState } from '../state/shopForDisplayState.state';
import { CardsState } from 'src/app/state/cardsState.state';
import { ShopState } from 'src/app/state/shopState.state';
import { ShopReducer, ShopForDisplayReducer } from './shop/shop.reducer';
import { DeckState } from '../state/deckState.state';
import { DecksReducer } from './deck/deck.reducer';

export interface AppState {
  auth: LogedUser;
  cardForDisplay: CardForDisplayState;
  shopForDisplay: ShopForDisplayState;
  cardsState: CardsState;
  shopState: ShopState;
  deckState: DeckState;
}

export const Reducers = {
  auth: UserReducer,
  cards: CardsReducer,
  cardForDisplay: CardForDisplayReducer,
  shopState: ShopReducer,
  shopForDisplay: ShopForDisplayReducer,
  deckState: DecksReducer,
};
