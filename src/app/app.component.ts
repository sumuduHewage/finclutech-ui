import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./feature/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit():void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  logout() :void{
    this.authService.logout();
  }

}
