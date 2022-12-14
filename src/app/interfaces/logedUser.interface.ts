import { profiles } from '../enums/profiles.enum';

export interface LogedUser {
  id: number;
  username: string;
  access_token: string;
  profiles: profiles;
  balance: number;
}
