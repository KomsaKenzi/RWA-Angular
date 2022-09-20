import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Card } from 'src/app/models/card.model';
import { AppState } from 'src/app/store/app.state';
import { setCardForDisplay } from 'src/app/store/cards/cards.actions';

@Component({
  selector: 'app-cards-display',
  templateUrl: './cards-display.component.html',
  styleUrls: ['./cards-display.component.css']
})
export class CardsDisplayComponent implements OnInit {
  @Input() card: Card | null = null;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
  }

}
