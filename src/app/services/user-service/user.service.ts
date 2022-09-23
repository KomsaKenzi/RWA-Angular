import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LogedUser } from 'src/app/interfaces/logedUser.interface';
import { RegisterData } from 'src/app/interfaces/registerData.interface';
import { User } from 'src/app/models/user.model';
import { UserInfo } from 'src/app/interfaces/userInfo.interface';
import { UpdateShop } from 'src/app/interfaces/updateShop.interface';
import { UpdateBalance } from 'src/app/interfaces/updateBalance.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
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

  getProfileData(id: number) {
    return this.http.get<UserInfo>(
      `${environment.url}/users/getProfileData/${id}`
    );
  }

  searchUsers(name: string, userID: number) {
    return this.http.get<User[]>(
      `${environment.url}/users/searchUsers/${name}/${userID}`
    );
  }

  updateBalance(data: UpdateBalance) {
    return this.http.put<UserInfo>(
      `${environment.url}/users/updateBalance/`,
      data
    );
  }
}
