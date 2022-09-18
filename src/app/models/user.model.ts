import { profiles } from '../enums/profiles.enum';

export interface User {
  id: number;
  username: string;
  email: string;
  profileType: profiles;
}
