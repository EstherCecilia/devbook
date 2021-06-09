import { Component,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router"

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient,private  router:Router) {}

  users: any[] = [];
  faSearch = faSearch;

  ngOnInit() {
    // Simple GET request with response type <any>
    this.http.get<any>('https://api.github.com/users').subscribe((data) => {
      this.users = data.slice(0, 6);
    });
  }
  onUserChange(user: string) {
    this.router.navigate(['/user',user]).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
    onBack():void {
      this.router.navigate(['/']).then(e => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
  }
}
