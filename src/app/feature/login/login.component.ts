import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password)
        .subscribe(
          (response:any) => {
            this.router.navigate(['/dashboard']);
            this.showSuccess('Login Successfully!')
          },
          (error:any) => {
            this.error = 'Invalid login Credentials';
            this.showError(this.error);
          }
        );
    } else {
      this.error = 'Invalid login Credentials';
      this.showError(this.error);
    }
  }

  showError(message: string) {
    this.toastr.error(message, 'Alert!');
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Alert!');
  }
}
