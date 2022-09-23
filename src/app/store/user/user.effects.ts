import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { LogedUser } from 'src/app/interfaces/logedUser.interface';
import { UserInfo } from 'src/app/interfaces/userInfo.interface';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user-service/user.service';
import * as UserActions from './user.actions';

declare var bootbox: any;

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  loginRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.login),
      exhaustMap((action) =>
        this.userService
          .login(action.userData.username, action.userData.password)
          .pipe(
            map((userData: LogedUser) =>
              UserActions.loginSuccess({ userData })
            ),
            catchError(() => of(UserActions.loginFail()))
          )
      )
    )
  );

  loginWithTokenRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.loginWithToken),
      exhaustMap((action) =>
        this.userService.loginWithToken(action.username).pipe(
          map((userData: LogedUser) => {
            this.router.navigate(['home']);
            return UserActions.loginWithTokenSuccess({ userData });
          }),
          catchError(() => of(UserActions.loginFail()))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.loginSuccess),
        tap(({ userData }) => {
          localStorage.setItem('JWT', userData.access_token);
          this.router.navigate(['home']);
        })
      ),
    { dispatch: false }
  );

  loginFail$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.loginFail),
        tap(() => {
          bootbox.alert('Login failed, invalid data!');
        })
      ),
    { dispatch: false }
  );

  loginWithTokenSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.loginWithTokenSuccess),
        tap(({ userData }) => {
          localStorage.setItem('JWT', userData.access_token);
        })
      ),
    { dispatch: false }
  );

  registerRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.register),
      exhaustMap((action) =>
        this.userService.register(action.registerData).pipe(
          map((userData: User) => UserActions.registerSuccess()),
          catchError(() => of(UserActions.registerFail()))
        )
      )
    )
  );

  registerSucce$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.registerSuccess),
        tap(() => {
          bootbox.alert(
            'Profile successfully created, you can now login and use the app!'
          );
          this.router.navigate(['login']);
        })
      ),
    { dispatch: false }
  );

  registerFail$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.registerFail),
        tap(() => {
          bootbox.alert(
            'Profile cannot be created with the data you have provided because username and/or email are already taken!'
          );
        })
      ),
    { dispatch: false }
  );

  updateBalances$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.updateBalance),
      exhaustMap((action) =>
        this.userService.updateBalance(action.data).pipe(
          map((user: UserInfo) => {
            this.router.navigate(['home']);
            return UserActions.updateBalanceSuccess({ user });
          })
        )
      ),
      catchError(() => of(UserActions.updateBalanceFail()))
    )
  );
}
