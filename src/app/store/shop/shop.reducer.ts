import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Shop } from 'src/app/models/shop.model';
import { ShopState } from 'src/app/state/shopState.state';
import { ShopForDisplayState } from 'src/app/state/shopForDisplayState.state';
import * as ShopActions from './shop.actions';

declare var bootbox: any;

const adapter: EntityAdapter<Shop> = createEntityAdapter<Shop>();

export const shopInitialState = adapter.getInitialState({
  selectedShop: -1,
});

const _shopReducer = createReducer(
    shopInitialState,

  on(
    ShopActions.createShopSuccess,
    (state: ShopState, { shop }) => {
      bootbox.alert(`Card "${shop.card.name}" added to shop  posted!`);
      return adapter.addOne(shop, state);
    }
  ),

  on(
    ShopActions.updateShopSuccess,
    (state: ShopState, { shop }) => {
      bootbox.alert('Card in shop successfully updated!');
      return adapter.updateOne(
        {
          id: shop.id,
          changes: {
            price: shop.price,
            text: shop.text,
          },
        },
        state
      );
    }
  ),


  on(ShopActions.updateShopFail, (state: ShopState) => {
    bootbox.alert(
      'Error occured while updating an card, please try again later!'
    );
    return state;
  }),

  on(ShopActions.deleteShopSuccess, (state: ShopState, { id }) => {
    return adapter.removeOne(id, state);
  }),

  on(ShopActions.deleteShopFail, (state: ShopState) => {
    bootbox.alert(
      'An error occured while deleting card, try again later!'
    );
    return state;
  }),

 
);

export const initialShopForShowState: ShopForDisplayState = {
  shop: null,
};

const _shopForDisplayReducer = createReducer(
  initialShopForShowState,
  on(
    ShopActions.setShopForDisplay,
    (state: ShopForDisplayState, { shop }) => {
      return {
        ...state,
        shop: shop,
      };
    }
  ),


);
export function ShopForDisplayReducer(
  state: ShopForDisplayState | undefined,
  action: Action
) {
  return _shopForDisplayReducer(state, action);
}



export function ShopReducer(
  state: ShopState | undefined,
  action: Action
) {
  return _shopReducer(state, action);
}