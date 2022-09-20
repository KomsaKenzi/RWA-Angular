import { Component, Input, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/shop.model';
import { Store } from '@ngrx/store';
import { ShopService } from 'src/app/services/shop-service/shop.service';
import { AppState } from 'src/app/store/app.state';
import { Router } from '@angular/router';
import { deleteShop, setShopForDisplay } from 'src/app/store/shop/shop.actions';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @Input() shop: Shop | null = null;
  shops: Shop[] = [];
  shopsForDisplay: Shop[] = [];
  constructor(
    private store: Store<AppState>,
    private shopService: ShopService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shopService
          .getShops()
          .subscribe((shops: Shop[]) => {
            this.shops = shops;
            this.shopsForDisplay = shops;
          });
      
  }

  createCard(){
    this.router.navigate(['cards']);
  }
  addCardToShop(){
    this.router.navigate(['shopAddCard']);
  }

  buyCard(){
    this.router.navigate(['cards']);
  }

  deleteCard(shops: Shop){
    if (shops) {
      const id:number = shops.id;
      
      this.store.dispatch(deleteShop({ id }));
    }
  }
  editCard(shop: Shop){
    if (shop) {
      this.store.dispatch(setShopForDisplay({ shop }));
      this.router.navigate(['shopUpdateCard']);
    }
    
  }
}
