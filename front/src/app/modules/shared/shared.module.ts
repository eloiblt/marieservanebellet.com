import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.pulse
    }),
  ],
  exports: [
    CommonModule,
    NgxLoadingModule
  ],
})
export class SharedModule { }
