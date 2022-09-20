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

const routes: Routes = [
  { path: 'login', component: LoginFormaComponent },
  { path: '', component: LoginFormaComponent },
  { path: 'register', component: RegisterFormaComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'deck', component: DeckComponent },
  { path: 'battle', component: BattleComponent },
  { path: 'createCard', component: CardsCreateComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'updateCard', component: CardsUpdateComponent },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
