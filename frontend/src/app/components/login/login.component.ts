import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginApiService } from '../../services/api/login.api-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  loginForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(8)]),
  });
  public error = false;

  private readonly loginApiService: LoginApiService = inject(LoginApiService);
  private readonly router: Router = inject(Router);

  get mail() {
    return this.loginForm.get('mail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async login() {
    try {
      const jwt = await firstValueFrom(
        this.loginApiService.login(this.loginForm.value),
      );
      localStorage.setItem('token', jwt);
      await this.router.navigate(['adminManagement']);
    } catch {
      this.error = true;
    }
  }
}
