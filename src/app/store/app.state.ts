import { LogedUser } from '../interfaces/logedUser.interface';
import { UserReducer } from './user/user.reducer';
import { CardsReducer, CardForDisplayReducer} from './cards/cards.reducer';
import { CardForDisplayState } from '../state/cardForDisplayState.state';
import { CardsState } from 'src/app/state/cardsState.state';


export interface AppState {
  auth: LogedUser;
  cardForDisplay: CardForDisplayState;
  cardsState: CardsState;
}

export const Reducers = {
  auth: UserReducer,
  cards: CardsReducer,
  cardForDisplay: CardForDisplayReducer,
};
