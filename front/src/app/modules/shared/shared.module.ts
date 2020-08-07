import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.pulse,
      primaryColour: 'white'
    }),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [
    CommonModule,
    NgxLoadingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
})
export class SharedModule { }
