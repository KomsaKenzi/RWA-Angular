import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { profiles } from 'src/app/enums/profiles.enum';
import { AppState } from 'src/app/store/app.state';
import { loginWithToken, logout } from 'src/app/store/user/user.actions';
import { selectUserData } from 'src/app/store/user/user.selectors';
import { JwtHelperService } from '@auth0/angular-jwt';
import { interval } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserInfo } from 'src/app/interfaces/userInfo.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  private jwtService: JwtHelperService = new JwtHelperService();

  username: string | null = null;
  profiles: profiles | null = null;
  userID: number | null = null;
  balance: number | null = null;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token: string | null = localStorage.getItem('JWT');
    if (token) {
      const username: string = this.jwtService.decodeToken(token).username;
      this.store.dispatch(loginWithToken({ username }));
    }
    this.setBal();
  }

  setBal() {
    this.store.select(selectUserData).subscribe((stateData) => {
      if (stateData.username && stateData.profiles && stateData.id) {
        this.userID = stateData.id;
        this.setHeader();
        if (this.userID)
          this.userService
            .getProfileData(this.userID)
            .subscribe((user: UserInfo) => {
              this.balance = user.balance;
            });
      } else {
        this.clearHeader();
      }
    });
    setTimeout(() => {
      this.setBal();
    }, 1000);
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

  setHeader() {
    const userLabel: HTMLElement | null = document.getElementById('userLabel');
    if (userLabel) userLabel.textContent = this.username;

    const userInfo: HTMLElement | null = document.getElementById('userInfo');
    if (userInfo) userInfo.style.visibility = 'visible';

    const title: HTMLElement | null = document.getElementById('title');
    if (title) title.className = 'headerTitle';

    const menu: HTMLElement | null = document.getElementById('menu');
    if (menu) menu.style.visibility = 'visible';

    const menu2: HTMLElement | null = document.getElementById('menu2');
    if (menu2) menu2.style.visibility = 'visible';

    const button: HTMLElement | null = document.getElementById('reports');
    if (button && this.profiles === 'user') {
      button.style.visibility = 'hidden';
      button.style.pointerEvents = 'none';
    }
  }

  clearHeader() {
    const userInfo: HTMLElement | null = document.getElementById('userInfo');
    if (userInfo) userInfo.style.visibility = 'hidden';

    const title: HTMLElement | null = document.getElementById('title');
    if (title) title.className = 'titleNotLogedIn';

    const menu: HTMLElement | null = document.getElementById('menu');
    if (menu) menu.style.visibility = 'hidden';

    const menu2: HTMLElement | null = document.getElementById('menu2');
    if (menu2) menu2.style.visibility = 'hidden';
  }
}
