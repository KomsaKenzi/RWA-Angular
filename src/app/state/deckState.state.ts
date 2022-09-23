import { EntityState } from '@ngrx/entity';
import { Deck } from '../models/deck.model';

export interface DeckState extends EntityState<Deck> {
  selectedDeck: number;
}
