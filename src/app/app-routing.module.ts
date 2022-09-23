import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormaComponent } from './components/login-forma/login-forma.component';
import { RegisterFormaComponent } from './components/register-forma/register-forma.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { DeckComponent } from './components/deck/deck.component';
import { BattleComponent } from './components/battle/battle.component';
import { CardsCreateComponent } from './components/cards-create/cards-create.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardsUpdateComponent } from './components/cards-update/cards-update.component';
import { ShopAddCardComponent } from './components/shop-add-card/shop-add-card.component';
import { ShopUpdateCardComponent } from './components/shop-update-card/shop-update-card.component';
import { CreateDeckComponent } from './components/create-deck/create-deck.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginFormaComponent },
  { path: '', component: LoginFormaComponent },
  { path: 'register', component: RegisterFormaComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard] },
  { path: 'shopAddCard', component: ShopAddCardComponent, canActivate: [AdminGuard] },
  { path: 'shopUpdateCard', component: ShopUpdateCardComponent, canActivate: [AdminGuard] },
  { path: 'deck', component: DeckComponent, canActivate: [AuthGuard] },
  { path: 'battle', component: BattleComponent, canActivate: [AuthGuard] },
  { path: 'createCard', component: CardsCreateComponent, canActivate: [AdminGuard] },
  { path: 'cards', component: CardsComponent, canActivate: [AdminGuard] },
  { path: 'updateCard', component: CardsUpdateComponent, canActivate: [AdminGuard] },
  { path: 'createDeck', component: CreateDeckComponent, canActivate: [AuthGuard] },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
