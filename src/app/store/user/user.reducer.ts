import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UserState } from 'src/app/state/userState.state';
import * as UserActions from 'src/app/store/user/user.actions';

declare var bootbox: any;

export const initialUserState: UserState = {
  id: null,
  username: null,
  profiles: null,
  access_token: null,
  balance: null,
};

const _userReducer = createReducer(
  initialUserState,

  on(UserActions.loginSuccess, (state: UserState, { userData }) => {
    return {
      id: userData.id,
      username: userData.username,
      access_token: userData.access_token,
      profiles: userData.profiles,
      balance: userData.balance,
    };
  }),

  on(UserActions.loginWithTokenSuccess, (state: UserState, { userData }) => {
    return {
      id: userData.id,
      username: userData.username,
      access_token: userData.access_token,
      profiles: userData.profiles,
      balance: userData.balance,
    };
  }),

  on(UserActions.loginFail, (state: UserState) => {
    return {
      id: null,
      username: null,
      access_token: null,
      profiles: null,
      balance: null,
    };
  }),

  on(UserActions.logout, (state: UserState) => {
    return {
      id: null,
      username: null,
      access_token: null,
      profiles: null,
      balance: null,
    };
  })
);

export function UserReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}

const adapter: EntityAdapter<User> = createEntityAdapter<User>();
