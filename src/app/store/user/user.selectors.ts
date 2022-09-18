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

export const selectProfileType = createSelector(
  selectUserState,
  (state) => state.profileType
);

export const selectUserData = createSelector(
  selectUsername,
  selectProfileType,
  selectID,
  (
    username: string | null,
    profiles: profiles | null,
    id: number | null
  ) => {
    return {
      username,
      profiles,
      id,
    };
  }
);

