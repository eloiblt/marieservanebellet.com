import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    ManagementComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AdminModule { }
