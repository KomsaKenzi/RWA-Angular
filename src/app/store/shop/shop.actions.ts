import { createAction, props } from '@ngrx/store';
import { Shop } from 'src/app/models/shop.model';
import { UpdateShop } from '../../interfaces/updateShop.interface';
import { ShopInfo } from '../../interfaces/shopInfo.interface';

export const createShop = createAction(
  'CreateShop',
  props<{ shop: ShopInfo }>()
);


export const createShopSuccess = createAction(
  'CreateShopSuccess',
  props<{ shop: Shop }>()
);

export const createShopSuccessNavigate = createAction(
  'CreateShopSuccessNavigate',
  props<{ shop: Shop }>()
);

export const createShopFail = createAction('CreateShopFail');

export const updateShop = createAction(
  'UpdateShop',
  props<{ data: UpdateShop }>()
);

export const updateShopSuccess = createAction(
  'UpdateShopSuccess',
  props<{ shop: Shop }>()
);

export const updateShopFail = createAction('UpdateShopFail');


export const deleteShop = createAction(
  'DeleteShop',
  props<{ id: number }>()
);

export const deleteShopSuccessNavigate = createAction(
  'DeleteShopSuccessNavigate',
  props<{ id: number }>()
);

export const deleteShopSuccess = createAction(
  'DeleteShopSuccess',
  props<{ id: number }>()
);

export const deleteShopFail = createAction('DeleteShopFail');

export const setShopForDisplay = createAction(
  'SetShopForDisplay',
  props<{ shop: Shop }>()
);
