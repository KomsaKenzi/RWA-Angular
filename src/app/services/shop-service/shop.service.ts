import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shop } from 'src/app/models/shop.model';
import { OwnedCard } from 'src/app/models/ownedCard.model';
import { environment } from 'src/environments/environment';
import { ShopInfo } from 'src/app/interfaces/shopInfo.interface';
import { UpdateShop } from 'src/app/interfaces/updateShop.interface';
import { BuyCard } from 'src/app/interfaces/buyCard.interface';
import { Card } from 'src/app/models/card.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  getShops() {
    return this.http.get<Shop[]>(`${environment.url}/shop/getShops/`);
  }

  createShop(data: ShopInfo) {
    return this.http.post<Shop>(`${environment.url}/shop/addToShop`, {
      price: data.price,
      text: data.text,
      cardId: data.cardId,
    });
  }

  deleteShop(id: number) {
    return this.http.delete<Shop>(`${environment.url}/shop/deleteShop/${id}`);
  }

  updateShop(data: UpdateShop) {
    return this.http.put<Shop>(`${environment.url}/shop/updateShop`, data);
  }

  buyCard(data: BuyCard) {
    return this.http.post<OwnedCard>(
      `${environment.url}/owned-cards/buyCard`,
      data
    );
  }

  getOwnedCardsForId(id: number) {
    return this.http.get<OwnedCard[]>(
      `${environment.url}/owned-cards/getOwnedCardsForId/${id}`
    );
  }

  deleteOwnedCards(id: number) {
    return this.http.delete<OwnedCard>(
      `${environment.url}/owned-cards/deleteOwnedCards/${id}`
    );
  }
}
