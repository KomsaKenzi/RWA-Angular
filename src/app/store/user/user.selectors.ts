import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from 'src/app/state/userState.state';
import { profiles } from 'src/app/enums/profiles.enum';
import { User } from 'src/app/models/user.model';

export const selectUserState = createFeatureSelector<UserState>('auth');

export const selectID = createSelector(selectUserState, (state) => state.id);

export const selectToken = createSelector(
  selectUserState,
  (state) => state.access_token
);

export const selectUsername = createSelector(
  selectUserState,
  (state) => state.username
);

export const selectProfiles = createSelector(
  selectUserState,
  (state) => state.profiles
);

export const selectBalance = createSelector(
  selectUserState,
  (state) => state.balance
);

export const selectUserData = createSelector(
  selectUsername,
  selectProfiles,
  selectID,
  selectBalance,
  (
    username: string | null,
    profiles: profiles | null,
    id: number | null,
    balance: number | null
  ) => {
    return {
      username,
      profiles,
      id,
      balance,
    };
  }
);
