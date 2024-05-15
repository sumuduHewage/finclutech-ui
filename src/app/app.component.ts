import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./feature/services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit():void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  logout() :void{
    this.authService.logout();
    this.router.navigate(['/login']);
    this.showSuccess('logout successfully')
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Alert!');
  }

  showError(message: string) {
    this.toastr.error(message, 'Alert!');
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

  showWarning(message: string) {
    this.toastr.warning(message, 'Alert!');
  }

}
