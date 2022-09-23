import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { OwnedCard } from 'src/app/models/ownedCard.model';
import { Shop } from 'src/app/models/shop.model';
import { ShopService } from 'src/app/services/shop-service/shop.service';
import * as ShopActions from './shop.actions';

@Injectable()
export class ShopEffects {
  constructor(
    private action$: Actions,
    private shopService: ShopService,
    private router: Router,
    private store: Store
  ) {}

  createShopsRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShopActions.createShop),
      exhaustMap((action) =>
        this.shopService.createShop(action.shop).pipe(
          map((shop: Shop) => ShopActions.createShopSuccessNavigate({ shop })),
          catchError(() => of(ShopActions.createShopFail()))
        )
      )
    )
  );

  createShopsSuccessNavigate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ShopActions.createShopSuccessNavigate),
        tap((action) => {
          const shop: Shop = action.shop;
          this.router.navigate(['shop']);
          this.store.dispatch(ShopActions.createShopSuccess({ shop }));
        })
      ),
    { dispatch: false }
  );

  updateShops$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShopActions.updateShop),
      exhaustMap((action) =>
        this.shopService.updateShop(action.data).pipe(
          map((shop: Shop) => {
            this.router.navigate(['shop']);
            return ShopActions.updateShopSuccess({ shop });
          })
        )
      ),
      catchError(() => of(ShopActions.updateShopFail()))
    )
  );

  deleteShops$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShopActions.deleteShop),
      exhaustMap((action) => {
        const id: number = action.id;
        return this.shopService
          .deleteShop(action.id)
          .pipe(
            map((res: Shop) => ShopActions.deleteShopSuccessNavigate({ id }))
          );
      }),
      catchError(() => of(ShopActions.deleteShopFail()))
    )
  );

  deleteShopsSuccessNavigate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ShopActions.deleteShopSuccessNavigate),
        tap((action) => {
          const id: number = action.id;
          this.router.navigate(['shop']);
          this.store.dispatch(ShopActions.deleteShopSuccess({ id }));
        })
      ),
    { dispatch: false }
  );

  buyCardsRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShopActions.buyCard),
      exhaustMap((action) =>
        this.shopService.buyCard(action.buyCard).pipe(
          map((ownedCard: OwnedCard) =>
            ShopActions.buyCardSuccessNavigate({ ownedCard })
          ),
          catchError(() => of(ShopActions.createShopFail()))
        )
      )
    )
  );

  buyCardsSuccessNavigate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ShopActions.buyCardSuccessNavigate),
        tap((action) => {
          const ownedCard: OwnedCard = action.ownedCard;
          this.router.navigate(['shop']);
          this.store.dispatch(ShopActions.buyCardSuccess({ ownedCard }));
        })
      ),
    { dispatch: false }
  );
}
