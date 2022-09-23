import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardInfo } from 'src/app/interfaces/cardInfo.interface';
import { Card } from 'src/app/models/card.model';
import { environment } from 'src/environments/environment';
import { UpdateCards } from 'src/app/interfaces/updateCards.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}

  createCards(data: CardInfo) {
    return this.http.post<Card>(`${environment.url}/cards/createCards`, {
      name: data.name,
      attack: data.attack,
      defence: data.defence,
      description: data.description,
    });
  }

  getCards() {
    return this.http.get<Card[]>(`${environment.url}/cards/getCards/`);
  }

  getCardsForId(id: number) {
    return this.http.get<Card>(`${environment.url}/cards/getCardsForId/${id}`);
  }

  deleteCards(id: number) {
    return this.http.delete<Card>(`${environment.url}/cards/deleteCards/${id}`);
  }

  updateCards(data: UpdateCards) {
    return this.http.put<Card>(`${environment.url}/cards/updateCards`, data);
  }
}
