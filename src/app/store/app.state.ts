import { LogedUser } from '../interfaces/logedUser.interface';
import {  UserReducer } from './user/user.reducer';

export interface AppState {
  auth: LogedUser;
}

export const Reducers = {
  auth: UserReducer,
};
