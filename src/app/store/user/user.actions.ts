import { createAction, props } from '@ngrx/store';
import { UpdateBalance } from 'src/app/interfaces/updateBalance.interface';
import { UserInfo } from 'src/app/interfaces/userInfo.interface';
import { User } from 'src/app/models/user.model';
import { LogedUser } from '../../interfaces/logedUser.interface';
import { LoginData } from '../../interfaces/loginData.interface';
import { RegisterData } from '../../interfaces/registerData.interface';

export const login = createAction('Login', props<{ userData: LoginData }>());

export const loginSuccess = createAction(
  'LoginSuccess',
  props<{ userData: LogedUser }>()
);

export const loginFail = createAction('LoginFail');

export const logout = createAction('Logout');

export const register = createAction(
  'Register',
  props<{ registerData: RegisterData }>()
);

export const registerSuccess = createAction('RegisterSuccess');

export const registerFail = createAction('RegisterFail');

export const loginWithToken = createAction(
  'LoginWithToken',
  props<{ username: string }>()
);

export const loginWithTokenSuccess = createAction(
  'LoginWithTokenSuccess',
  props<{ userData: LogedUser }>()
);

export const updateBalance = createAction(
  'UpdateBalance',
  props<{ data: UpdateBalance }>()
);

export const updateBalanceSuccess = createAction(
  'UpdateBalanceSuccess',
  props<{ user: UserInfo }>()
);

export const updateBalanceFail = createAction('UpdateBalanceFail');
