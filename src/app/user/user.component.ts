import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
  faSortDown,
  faStar,
  faHistory,
  faCodeBranch,
  faClock,
  faBook,
} from '@fortawesome/free-solid-svg-icons';

class users {
  nome: string;
  bio: string;
  login: string;
  public_repos: number;
  following: number;
  followers: number;

  constructor(
    nome: string,
    bio: string,
    login: string,
    public_repos: number,
    following: number,
    followers: number
  ) {
    this.nome = nome;
    this.bio = bio;
    this.login = login;
    this.public_repos = public_repos;
    this.following = following;
    this.followers = followers;
  }
}

@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  faSortDown = faSortDown;
  faStar = faStar;
  faHistory = faHistory;
  faCodeBranch = faCodeBranch;
  faClock = faClock;
  faBook = faBook;

  user: users = {
    nome: 'Não informado',
    bio: 'Não informado',
    login: 'Não informado',

    public_repos: 0,
    following: 0,
    followers: 0,
  };
  repos: any[] = [];

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params.id);
      this.http
        .get<any>('https://api.github.com/users/' + params.id)
        .subscribe({
          next: (data) => {
            let name = data ? data.name : '';
            let bio = data ? data.bio : '';
            let login = data ? data.login : '';
            let public_repos = data ? data.public_repos : 0;
            let followers = data ? data.followers : 0;
            let following = data ? data.following : 0;
            this.user = new users(
              name,
              bio,
              login,
              public_repos,
              followers,
              following
            );
          },
          error: (error) => {
            console.error('There was an error!', error);
            this.router.navigate(['/']);
          },
        });

      this.http
        .get<any>('https://api.github.com/users/' + params.id + '/repos')
        .subscribe((data) => {
          this.repos = data;
        });
    });
  }
}
