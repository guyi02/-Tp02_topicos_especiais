import { Injectable } from '@angular/core';
import { Wallet } from '../models/WalletType';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  mainWalletInitialValue: number = 50000;
  mainWalletHash: string =
    '79809644A830EF92424A66227252B87BBDFB633A9DAB18BA450C1B8D35665F20';

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

          setTimeout(() => {
            localStorage.setItem('USERWALLET', JSON.stringify(wallet));
          }, 200);
        }
      });
    }

    let valueToInsert = valueInBtc;
    let obj = {
      hash: walletAddress,
      total: `${parseFloat(valueToInsert.toString())}`,
    };
    localStorage.setItem('USERWALLET', JSON.stringify(obj));
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
            setTimeout(() => {
              localStorage.setItem('USERWALLET', JSON.stringify(wallet));
            }, 200);
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
      total: this.mainWalletInitialValue.toString(),
    };

    let data = JSON.stringify(obj);
    localStorage.setItem('OTHERWALLET', data);
  }
}
