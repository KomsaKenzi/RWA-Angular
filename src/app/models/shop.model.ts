import { Card } from "./card.model";

export interface Shop {
  id: number;
  price: number;
  text: string;
  card: Card;
}
