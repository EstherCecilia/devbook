import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private http: HttpClient, private router: Router) {}

  users: any[] = [];
  faSearch = faSearch;

  ngOnInit() {
    // Simple GET request with response type <any>
    this.http.get<any>('https://api.github.com/users').subscribe((data) => {
      this.users = data.slice(0, 6);

      console.log(this.users);
    });
  }
 

  onUserClick(user: string){
    console.log(user)
    this.router.navigate(['/user',user])
  }
}
