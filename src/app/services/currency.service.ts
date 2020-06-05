import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CurrencyResponse } from '../models/CurrencyType';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {
    this.requestCurrencyBitcoin();
  }

  actualCurrency;

  lastCurrencies = [];

  oldCurrencies = [
    {
      date: '',
      currency_brl: '',
      currency_usd: '',
    },
  ];

  indexCurrency;

  timer: any;

  /**
   * Determina a cotação atual
   */
  requestCurrencyBitcoin() {
    if (!this.timer) {
      let i = 0;
      this.timer = setInterval(() => {
        this.http
          .get<CurrencyResponse>(
            'https://api.coindesk.com/v1/bpi/currentprice/BRL.json'
          )
          .subscribe((data) => {
            const brl_currency = data.bpi.BRL.rate_float;
            // Último registro
            const lastCurrency =
              this.lastCurrencies[this.lastCurrencies.length - 1] || 1;

            // Verifica se cotação atual é diferente do valor da última
            if (brl_currency !== lastCurrency) {
              if (this.lastCurrencies.length > 0) {
                this.indexCurrency = (brl_currency / lastCurrency - 1) * 100;
              }
              this.lastCurrencies.push(brl_currency);
            }
            i++;
            // Registra a data e o valor retornado pela requisição
            this.oldCurrencies.push({
              date: data.time.updated,
              currency_brl: data.bpi.BRL.rate + i,
              currency_usd: data.bpi.USD.rate + i,
            });

            // Define a cotação atual
            this.actualCurrency = brl_currency;
          });
      }, 30000);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * Acessa o atributo `actualCurrency`
   */
  getCurrentCurrency() {
    return this.actualCurrency;
  }

  getPastCurrencies() {
    return this.lastCurrencies;
  }

  getOldCurrencies() {
    return this.oldCurrencies;
  }
}
