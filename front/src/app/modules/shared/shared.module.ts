import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.pulse
    }),
    RouterModule
  ],
  exports: [
    CommonModule,
    NgxLoadingModule,
    RouterModule
  ],
})
export class SharedModule { }
