import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { LoginFormaComponent } from './components/login-forma/login-forma.component';
import { RegisterFormaComponent } from './components/register-forma/register-forma.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './components/home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user/user.effects';
import { CardsEffects } from './store/cards/cards.effects';
import { ShopEffects } from './store/shop/shop.effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './guards/interceptor';
import { MenuComponent } from './components/menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Reducers } from './store/app.state';
import { ShopComponent } from './components/shop/shop.component';
import { DeckComponent } from './components/deck/deck.component';
import { BattleComponent } from './components/battle/battle.component';
import { CardsCreateComponent } from './components/cards-create/cards-create.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardsDisplayComponent } from './components/cards-display/cards-display.component';
import { CardsUpdateComponent } from './components/cards-update/cards-update.component';
import { ShopAddCardComponent } from './components/shop-add-card/shop-add-card.component';
import { ShopUpdateCardComponent } from './components/shop-update-card/shop-update-card.component';
import { CreateDeckComponent } from './components/create-deck/create-deck.component';
import { DeckEffects } from './store/deck/deck.effects';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormaComponent,
    RegisterFormaComponent,
    HomeComponent,
    MenuComponent,
    ShopComponent,
    DeckComponent,
    BattleComponent,
    CardsCreateComponent,
    CardsComponent,
    CardsDisplayComponent,
    CardsUpdateComponent,
    ShopAddCardComponent,
    ShopUpdateCardComponent,
    CreateDeckComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    EffectsModule.forRoot([UserEffects, CardsEffects, ShopEffects, DeckEffects]) ,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatAutocompleteModule,
    StoreModule.forRoot(Reducers),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
