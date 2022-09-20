import { EntityState } from '@ngrx/entity';
import { Card } from '../models/card.model';

export interface CardsState extends EntityState<Card> {
  selectedCard: number;
}
