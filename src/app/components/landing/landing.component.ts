import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/models/offer.model';
import { LogOut } from '../../store/actions/auth.actions';
import { AppState, selectAuthState } from '../../store/app.states';
import { DeleteOffer, GetOffer } from './../../offer-store/actions/offer.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;
  offers: Offer[];
  offer: Offer = new Offer();
  isDarktheme: boolean;

  constructor(private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      if (state) {
        this.isAuthenticated = state.isAuthenticated;
        this.user = state.user;
        this.errorMessage = state.errorMessage;
      }
    });

    this.store.dispatch(new GetOffer());
    this.store.subscribe(data => {
      if (data && data.offer) {
        this.offers = data.offer.offer;
      }
    });
  }

  logOut(): void {
    // tslint:disable-next-line: new-parens
    this.store.dispatch(new LogOut);
  }

  deleteOffer(offer: Offer): void {
    this.store.dispatch(new DeleteOffer(offer.id));
    this.store.dispatch(new GetOffer());
  }

  toggleTheme(): void {
    this.isDarktheme = !this.isDarktheme;
  }
}
