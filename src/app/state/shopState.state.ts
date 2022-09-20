import { EntityState } from '@ngrx/entity';
import { Shop } from '../models/shop.model';

export interface ShopState extends EntityState<Shop> {
  selectedShop: number;
}
