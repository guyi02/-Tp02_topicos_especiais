import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { CurrencyComponent } from './currency/currency.component';
import { IndexComponent } from './index/index.component';
import { MarketComponent } from './market/market.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'team', component: TeamComponent },
  { path: 'currency', component: CurrencyComponent },
  { path: 'market', component: MarketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
