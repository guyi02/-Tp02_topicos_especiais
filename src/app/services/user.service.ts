import { Injectable } from '@angular/core';
import { GitRepository, GitUser } from '../models/GitTypes';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'https://api.github.com/users/guyi02';
  gitUserInfo: GitUser = null;
  gitRepos: GitRepository = null;
  money: number = 0;
  userHash: string = '';

  constructor(public http: HttpClient) {}

  generateUserInfos(credit: number, walletHash: string) {
    this.money = credit;
    this.userHash = walletHash;
  }

  getGitInfos() {
    let user = this.http.get<GitUser>(`${this.baseUrl}`);
    let repos = this.http.get<GitRepository>(`${this.baseUrl}/repos`);
    return forkJoin([user, repos]);
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
