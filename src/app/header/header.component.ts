import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  variation: number = 0;
  cotationActual: number = 0;
  constructor(public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.variation = this.currencyService.percentCurrency;
  }
}
