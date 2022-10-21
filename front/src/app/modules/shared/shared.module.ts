import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheck,
  faMinusCircle,
  faBars,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FontAwesomeModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FontAwesomeModule
  ],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCheck, faMinusCircle, faBars, faArrowLeft);
  }
 }
