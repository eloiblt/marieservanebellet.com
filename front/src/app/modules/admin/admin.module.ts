import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';

@NgModule({
  declarations: [
    LoginComponent,
    ManagementComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
