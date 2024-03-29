import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginApiService } from 'src/app/services/api/login-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public error = false;

  constructor(private loginApiService: LoginApiService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      mail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.minLength(8)
      ]),
    });
  }

  get mail() {
    return this.loginForm.get('mail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.loginApiService.login(this.loginForm.value).subscribe(jwt => {
      localStorage.setItem('token', jwt);
      this.router.navigate(['adminManagement']);
    }, err => {
      this.error = true;
    });
  }
}
