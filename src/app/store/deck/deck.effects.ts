import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { Deck } from 'src/app/models/deck.model';
import { CardService } from 'src/app/services/card-service/card.service';
import { DeckService } from 'src/app/services/deck/deck.service';
import { ShopService } from 'src/app/services/shop-service/shop.service';
import * as DecksActions from './deck.actions';

@Injectable()
export class DeckEffects {
  constructor(
    private action$: Actions,
    private deckService: DeckService,
    private shopService: ShopService,
    private router: Router,
    private store: Store
  ) {}

  createDecksRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(DecksActions.createDeck),
      exhaustMap((action) =>
        this.deckService.createDeck(action.deck).pipe(
          map((deck: Deck) => DecksActions.createDeckSuccessNavigate({ deck })),
          catchError(() => of(DecksActions.createDeckFail()))
        )
      )
    )
  );

  createDecksSuccessNavigate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(DecksActions.createDeckSuccessNavigate),
        tap((action) => {
          const deck: Deck = action.deck;
          this.router.navigate(['deck']);
          this.store.dispatch(DecksActions.createDeckSuccess({ deck }));
        })
      ),
    { dispatch: false }
  );

  deleteDecks$ = createEffect(() =>
    this.action$.pipe(
      ofType(DecksActions.deleteDeck),
      exhaustMap((action) => {
        const id: number = action.id;
        return this.deckService
          .deleteDecks(action.id)
          .pipe(
            map((res: Deck) => DecksActions.deleteDeckSuccessNavigate({ id }))
          );
      }),
      catchError(() => of(DecksActions.deleteDeckFail()))
    )
  );

  deleteDecksSuccessNavigate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(DecksActions.deleteDeckSuccessNavigate),
        tap((action) => {
          const id: number = action.id;
          this.router.navigate(['home']);
          this.store.dispatch(DecksActions.deleteDeckSuccess({ id }));
        })
      ),
    { dispatch: false }
  );

  deleteOwnedCards$ = createEffect(() =>
    this.action$.pipe(
      ofType(DecksActions.deleteOwnedCard),
      exhaustMap((action) => {
        const id: number = action.id;
        return this.shopService
          .deleteOwnedCards(action.id)
          .pipe(map(() => DecksActions.deleteOwnedCardSuccessNavigate({ id })));
      }),
      catchError(() => of(DecksActions.deleteOwnedCardFail()))
    )
  );

  deleteOwnedCardsSuccessNavigate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(DecksActions.deleteOwnedCardSuccessNavigate),
        tap((action) => {
          const id: number = action.id;
          this.router.navigate(['home']);
          this.store.dispatch(DecksActions.deleteOwnedCardSuccess({ id }));
        })
      ),
    { dispatch: false }
  );
}
