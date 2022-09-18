import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LogedUser } from 'src/app/interfaces/logedUser.interface';
import { RegisterData } from 'src/app/interfaces/registerData.interface';
//import { UserProfileData } from 'src/app/interfaces/userProfileData.interface';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    return this.http.post<LogedUser>(`${environment.url}/users/login`, {
      username,
      password,
    });
  }

  loginWithToken(username: string) {
    return this.http.get<LogedUser>(
      `${environment.url}/users/loginWithToken/${username}`
    );
  }

  register(registerData: RegisterData) {
    return this.http.post<User>(`${environment.url}/users/register`, {
      username: registerData.username,
      password: registerData.password,
      email: registerData.email,
    });
  }

  /*getProfileData(id: number) {
    return this.http.get<UserProfileData>(
      `${environment.url}/users/getProfileData/${id}`
    );
  }*/

 
}