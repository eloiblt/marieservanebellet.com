import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotfoundComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class NavigationModule { }
