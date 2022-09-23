import { OwnedCard } from './ownedCard.model';

export interface Deck {
  id: number;
  userId: number;
  name: string;
  card1: number;
  card2: number;
  card3: number;
}
