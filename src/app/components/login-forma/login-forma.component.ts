import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { LoginData } from 'src/app/interfaces/loginData.interface';
import * as UserActions from '../../store/user/user.actions';


@Component({
  selector: 'app-login-forma',
  templateUrl: './login-forma.component.html',
  styleUrls: ['./login-forma.component.css'],
})
export class LoginFormaComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}
  username: string = '';
  password: string = '';

  ngOnInit(): void {}

  login() {
    if (this.username === '' || this.password === '') {
      const label: HTMLElement | null = document.getElementById('errorMessage');
      if (label) label.style.visibility = 'visible';
      return;
    }
    const userData: LoginData = {
      username: this.username,
      password: this.password,
    };
    this.store.dispatch(UserActions.login({ userData }));
  }

  registration(): void{
    this.router.navigate(['register']);
  }

  setUsername(username: string) {
    this.username = username;
  }

  setPassword(password: string) {
    this.password = password;
  }
}
