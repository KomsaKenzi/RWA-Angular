import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeckInfo } from 'src/app/interfaces/deckInfo.interface';
import { Deck } from 'src/app/models/deck.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private http: HttpClient) {}

  createDeck(data: DeckInfo) {
    return this.http.post<Deck>(`${environment.url}/deck/createDeck/`, {
      userId: data.userId,
      name: data.name,
      card1: data.card1,
      card2: data.card2,
      card3: data.card3,
    });
  }

  getDeck(id: number) {
    return this.http.get<Deck[]>(`${environment.url}/deck/getDecks/${id}`);
  }

  deleteDecks(id: number) {
    return this.http.delete<Deck>(`${environment.url}/deck/deleteDecks/${id}`);
  }
}
