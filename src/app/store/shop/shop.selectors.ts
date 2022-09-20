import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShopState } from 'src/app/state/shopState.state';
import { Shop } from 'src/app/models/shop.model';
import { ShopForDisplayState } from 'src/app/state/shopForDisplayState.state';

export const selectShopState =
  createFeatureSelector<ShopState>('shopState');

  export const selectShopForDisplayState =
  createFeatureSelector<ShopForDisplayState>('shopForDisplay');

export const selectShops = createSelector(
    selectShopState,
  (state: ShopState) => {
    return state.ids.map((id: number | string) => state.entities[id]);
  }
);

export const selectShopForDisplay = createSelector(
  selectShopForDisplayState,
  (state: ShopForDisplayState) => state.shop
);