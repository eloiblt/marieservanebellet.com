import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [FaIconComponent, NgClass, RouterLink],
})
export class NavbarComponent {
  public showMenu = false;
  public show = false;
  public environment = environment;
  faBars = faBars;
}
