import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyComponent } from './currency/currency.component';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { TeamComponent } from './team/team.component';
import { MarketComponent } from './market/market.component';
import { UserService } from './services/user.service';
import { CurrencyService } from './services/currency.service';
import { WalletService } from './services/wallet.service';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    CurrencyComponent,
    HeaderComponent,
    IndexComponent,
    MarketComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [UserService, CurrencyService, WalletService],
  bootstrap: [AppComponent],
})
export class AppModule {}
