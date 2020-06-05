import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { GitRepository, GitUser } from '../models/GitTypes';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  user: GitUser;
  repos: GitRepository;
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.getGitInfos().subscribe((data) => {
      const [user, repos] = data;
      this.user = user;
      this.repos = repos;
    });
  }
}
