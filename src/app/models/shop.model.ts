import { Card } from "./card.model";

export interface Shop {
  id: number;
  price: string;
  text: string;
  card: Card;
}
