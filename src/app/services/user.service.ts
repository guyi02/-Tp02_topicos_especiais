import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  money: number = 0;
  userHash: string = '';

  constructor() {}

  generateUserInfos(credit: number, walletHash: string) {
    this.money = credit;
    this.userHash = walletHash;
  }

  getUserInfos() {
    let user = {
      money: this.money,
      hash: this.userHash,
    };
    return user;
  }

  operationSell(value: number) {
    let newValue = (this.money += value);
    this.money = newValue;
  }

  operationBuy(value: number) {
    let newValue = (this.money -= value);
    this.money = newValue;
  }
}
