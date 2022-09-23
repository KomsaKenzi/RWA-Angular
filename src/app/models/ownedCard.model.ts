import { Card } from "./card.model";
import { User } from "./user.model";

export interface OwnedCard{
  id: number;
  card: Card;
  user: User;
}
