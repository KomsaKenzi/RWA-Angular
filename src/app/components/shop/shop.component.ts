import { Component, Input, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/shop.model';
import { Store } from '@ngrx/store';
import { ShopService } from 'src/app/services/shop-service/shop.service';
import { AppState } from 'src/app/store/app.state';
import { Router } from '@angular/router';
import { deleteShop, setShopForDisplay } from 'src/app/store/shop/shop.actions';
import { BuyCard } from 'src/app/interfaces/buyCard.interface';
import * as ShopActions from '../../store/shop/shop.actions';
import * as UserActions from '../../store/user/user.actions';
import { selectUserData } from 'src/app/store/user/user.selectors';
import { UserService } from 'src/app/services/user-service/user.service';
import { UpdateBalance } from 'src/app/interfaces/updateBalance.interface';
declare var bootbox: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @Input() shop: Shop | null = null;
  shops: Shop[] = [];
  shopsForDisplay: Shop[] = [];
  userID: number = 0;
  profiles: string = '';
  visibility: string = '';
  bal: number | null = 0;
  constructor(
    private store: Store<AppState>,
    private shopService: ShopService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shopService.getShops().subscribe((shops: Shop[]) => {
      this.shops = shops;
      this.shopsForDisplay = shops;
    });

    this.store.select(selectUserData).subscribe((stateData) => {
      if (stateData.profiles == 'admin') {
        this.setHeader();
      } else {
        this.clearHeader();
      }
    });
  }

  createCard() {
    this.router.navigate(['cards']);
  }
  addCardToShop() {
    this.router.navigate(['shopAddCard']);
  }

  buyCard(shops: Shop) {
    this.store.select(selectUserData).subscribe((data) => {
      if (data && data.id) {
        this.userID = data.id;
        this.bal = data.balance;
      }
    });

    const data: UpdateBalance = {
      id: this.userID,
      price: shops.price,
    };
    this.store.dispatch(UserActions.updateBalance({ data }));
    const buyCard: BuyCard = {
      userId: this.userID,
      cardId: shops.card.id,
    };
    this.store.dispatch(ShopActions.buyCard({ buyCard }));
  }

  deleteCard(shops: Shop) {
    if (shops) {
      const id: number = shops.id;

      this.store.dispatch(deleteShop({ id }));
    }
  }
  editCard(shop: Shop) {
    if (shop) {
      this.store.dispatch(setShopForDisplay({ shop }));
      this.router.navigate(['shopUpdateCard']);
    }
  }

  setHeader() {
    const dugmad: HTMLElement | null = document.getElementById('dugmad');
    if (dugmad) {
      this.visibility = 'dugmadE';
      dugmad.style.visibility = 'visible';
    }
  }

  clearHeader() {
    const dugmad: HTMLElement | null = document.getElementById('dugmad');
    if (dugmad) {
      this.visibility = 'dugmad';
      dugmad.style.visibility = 'hidden';
    }
  }
}
