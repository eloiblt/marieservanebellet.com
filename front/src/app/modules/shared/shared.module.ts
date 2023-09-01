import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheck,
  faMinusCircle,
  faBars,
  faArrowLeft, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { PictureComponent } from './picture/picture.component';

@NgModule({
  declarations: [
    PictureComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FontAwesomeModule,
    NgOptimizedImage
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FontAwesomeModule,
    PictureComponent
  ],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCheck, faMinusCircle, faBars, faArrowLeft, faArrowRight);
  }
 }
