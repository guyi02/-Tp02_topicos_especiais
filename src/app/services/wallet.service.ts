import { Injectable } from '@angular/core';
import { Wallet } from '../models/WalletType';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  otherWalletInitialValue: number = 50000;
  mainWalletHash: string =
    '79809644A830EF92424A66227252B87BBDFB633A9DAB18BA450C1B8D35665F20';
  historic = [];
  constructor() {}

  sendBtc(walletAddress: string, valueInBtc: number) {
    let listWallets = Object.keys(localStorage).reduce(function (obj, str) {
      obj[str] = JSON.parse(localStorage.getItem(str));
      return obj;
    }, {});

    let wallets = Object.values(listWallets);
    if (wallets.length > 1) {
      wallets.map((wallet: Wallet) => {
        if (wallet.hash === walletAddress) {
          let newTotal = `${
            parseFloat(wallet.total.toString()) +
            parseFloat(valueInBtc.toString())
          }`;
          wallet['total'] = newTotal;
          this.historic.push({
            date: new Date(),
            value: valueInBtc,
            type: 'buy',
          });
          setTimeout(() => {
            localStorage.setItem('USERWALLET', JSON.stringify(wallet));
          }, 200);
        }
      });
    } else {
      let valueToInsert = valueInBtc;
      let obj = {
        hash: walletAddress,
        total: `${parseFloat(valueToInsert.toString())}`,
      };
      this.historic.push({
        date: new Date(),
        value: valueInBtc,
        type: 'buy',
      });
      localStorage.setItem('USERWALLET', JSON.stringify(obj));
    }
  }

  sellBtc(walletAddress: string, valueInBtc: number) {
    let listWallets = Object.keys(localStorage).reduce(function (obj, str) {
      obj[str] = JSON.parse(localStorage.getItem(str));
      return obj;
    }, {});

    let wallets = Object.values(listWallets);
    if (wallets.length > 1) {
      wallets.map((wallet: Wallet) => {
        if (wallet.hash === walletAddress) {
          if (wallet['total'] < valueInBtc) {
            alert('Saldo insuficiente');
          } else {
            let newTotal = `${
              parseFloat(wallet.total.toString()) -
              parseFloat(valueInBtc.toString())
            }`;
            wallet['total'] = newTotal;
            this.historic.push({
              date: new Date(),
              value: valueInBtc,
              type: 'sell',
            });
            setTimeout(() => {
              localStorage.setItem('USERWALLET', JSON.stringify(wallet));
            }, 500);
          }
        }
      });
    }
  }

  getWalletsValues() {
    let listWallets = Object.keys(localStorage).reduce(function (obj, str) {
      obj[str] = JSON.parse(localStorage.getItem(str));
      return obj;
    }, {});

    console.log(listWallets);
  }

  generateExchangeWallet() {
    let obj = {
      hash: this.mainWalletHash,
      total: this.otherWalletInitialValue.toString(),
    };

    let data = JSON.stringify(obj);
    localStorage.setItem('OTHERWALLET', data);
  }

  getHistoric() {
    return this.historic;
  }
}
