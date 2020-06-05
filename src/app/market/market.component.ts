import { Component, OnInit, OnDestroy } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { CurrencyService } from '../services/currency.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent implements OnInit, OnDestroy {
  hash: string =
    'E4508A57F7F8D8DB27C56D69CD065F31F411CF5921F318EE5C21D81D2B82F6BD';
  myMoney: number;
  myWallet: number;
  actualCovertion: number;
  timerForWallet;
  constructor(
    public wallet: WalletService,
    public currencyService: CurrencyService,
    public userService: UserService
  ) {
    this.wallet.generateExchangeWallet();
    this.userService.generateUserInfos(1000, this.hash);
    this.myMoney = this.userService.getUserInfos().money;
  }

  ngOnInit(): void {
    this.timerForWallet = setInterval(() => {
      this.myMoney = this.userService.getUserInfos().money;
      let userWallet = JSON.parse(localStorage.getItem('USERWALLET'));
      if (userWallet) {
        this.myWallet = userWallet.total;
        this.actualCovertion = this.quotationForSell(userWallet.total);
      }
    }, 200);
  }

  ngOnDestroy() {
    localStorage.clear();
    if (this.timerForWallet) {
      clearInterval(this.timerForWallet);
    }
  }

  getWallets() {
    this.wallet.getWalletsValues();
  }

  buyBtn(buyValue: number) {
    let actualValue = this.userService.getUserInfos().money;
    if (actualValue < buyValue) {
      alert('Valor maior que seu saldo');
    } else {
      this.userService.operationBuy(buyValue);
      this.wallet.sendBtc(this.hash, this.quotationForBuy(buyValue));
    }
  }

  sellBtc(value: number) {
    let userWallet = JSON.parse(localStorage.getItem('USERWALLET'));
    if (userWallet.total < value) {
      alert('Você não possui este valor em Bitcoins');
    } else {
      this.userService.operationSell(this.quotationForSell(value));
      this.wallet.sellBtc(this.hash, value);
    }
  }

  quotationForBuy(valueBuy: number) {
    let actualQutation = this.currencyService.getActualCurrency();
    let calc = (valueBuy * 1) / actualQutation;
    return calc;
  }

  quotationForSell(valueSell: number) {
    let actualQutation = this.currencyService.getActualCurrency();
    let calc = actualQutation * valueSell;
    return calc;
  }
}
