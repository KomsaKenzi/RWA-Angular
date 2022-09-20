import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card-service/card.service';
import * as CardsActions from './cards.actions';

@Injectable()
export class CardsEffects {
  constructor(
    private action$: Actions,
    private cardService: CardService,
    private router: Router,
    private store: Store
  ) {}

  createCardsRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(CardsActions.createCard),
      exhaustMap((action) =>
        this.cardService.createCards(action.card).pipe(
          map((card: Card) =>
            CardsActions.createCardSuccessNavigate({ card })
          ),
          catchError(() => of(CardsActions.createCardFail()))
        )
      )
    )
  );

  createCardsSuccessNavigate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(CardsActions.createCardSuccessNavigate),
        tap((action) => {
          const card: Card = action.card;
          this.router.navigate(['cards']);
          this.store.dispatch(CardsActions.createCardSuccess({ card }));
        })
      ),
    { dispatch: false }
  );
  
  loadCards$ = createEffect(() =>
    this.action$.pipe(
      ofType(CardsActions.loadCard),
      exhaustMap(() =>
        this.cardService
          .getCards()
          .pipe(
            map((card: Card[]) =>
              CardsActions.loadCardSuccess({ card })
            )
          )
      ),
      catchError(() => of(CardsActions.loadCardFail()))
    )
  );

  updateCards$ = createEffect(() =>
    this.action$.pipe(
      ofType(CardsActions.updateCard),
      exhaustMap((action) =>
        this.cardService.updateCards(action.data).pipe(
          map((card: Card) => {
            this.router.navigate(['cards']);
            return CardsActions.updateCardSuccess({ card });
          })
        )
      ),
      catchError(() => of(CardsActions.updateCardFail()))
    )
  );

  deleteCards$ = createEffect(() =>
    this.action$.pipe(
      ofType(CardsActions.deleteCard),
      exhaustMap((action) => {
        const id: number = action.id;
        return this.cardService
          .deleteCards(action.id)
          .pipe(
            map((res: Card) =>
              CardsActions.deleteCardSuccessNavigate({ id })
            )
          );
      }),
      catchError(() => of(CardsActions.deleteCardFail()))
    )
  );

  deleteCardsSuccessNavigate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(CardsActions.deleteCardSuccessNavigate),
        tap((action) => {
          const id: number = action.id;
          this.router.navigate(['cards']);
          this.store.dispatch(CardsActions.deleteCardSuccess({ id }));
        })
      ),
    { dispatch: false }
  );

  

}
