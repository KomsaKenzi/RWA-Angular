import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { profiles } from 'src/app/enums/profiles.enum';
import { AppState } from 'src/app/store/app.state';
import { loginWithToken, logout } from 'src/app/store/user/user.actions';
import { selectUserData } from 'src/app/store/user/user.selectors';
import { JwtHelperService } from '@auth0/angular-jwt';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}

  private jwtService: JwtHelperService = new JwtHelperService();

  username: string | null = null;
  profiles: profiles | null = null;
  userID: number | null = null;

  ngOnInit(): void {
    const token: string | null = localStorage.getItem('JWT');
    if (token) {
      const username: string = this.jwtService.decodeToken(token).username;
      this.store.dispatch(loginWithToken({ username }));
    }
  }

  gotoShop() {
    this.router.navigate(['shop']);
  }

  gotoDeck() {
    this.router.navigate(['deck']);
  }

  gotoBattle() {
    this.router.navigate(['battle']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  logout() {
    localStorage.removeItem('JWT');
    this.router.navigate(['login']);
    this.store.dispatch(logout());
    this.username = null;
    this.profiles = null;
    this.userID = null;
  }
}
