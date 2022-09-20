import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shop } from 'src/app/models/shop.model';
import { environment } from 'src/environments/environment';
import { ShopInfo } from 'src/app/interfaces/shopInfo.interface';
import { UpdateShop } from 'src/app/interfaces/updateShop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getShops(){
    return this.http.get<Shop[]>(
      `${environment.url}/shop/getShops/`
    );
  }

  createShop(data: ShopInfo) {
    return this.http.post<Shop>(
      `${environment.url}/shop/addToShop`,
      {
        price: data.price,
        text: data.text,
        cardId: data.cardId,
      }
    );
  }

  deleteShop(id: number) {
    return this.http.delete<Shop>(
      `${environment.url}/shop/deleteShop/${id}`
    );
  }

  updateShop(data: UpdateShop) {
    return this.http.put<Shop>(
      `${environment.url}/shop/updateShop`,
      data
    );
  }
}
