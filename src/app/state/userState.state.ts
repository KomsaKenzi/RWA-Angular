import { profiles } from '../enums/profiles.enum';

export interface UserState {
  id: number | null;
  username: string | null;
  access_token: string | null;
  profiles: profiles | null;
  balance: number | null;
}
