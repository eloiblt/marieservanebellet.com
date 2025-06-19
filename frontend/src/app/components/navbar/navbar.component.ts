import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCircleDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [FaIconComponent, NgClass, RouterLink],
})
export class NavbarComponent implements OnInit {
  public showMenu = false;
  public show = false;
  public environment = environment;
  faBars = faBars;
  faCircleDown = faCircleDown;

  private readonly platformId = inject(PLATFORM_ID);
  private deferredPrompt: any = null;
  private isApple = false;
  private isMobileOrTablet = false;

  get canInstall(): boolean {
    return this.isMobileOrTablet && (this.deferredPrompt || this.isApple);
  }

  ngOnInit() {
    this.isApple =
      /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) ||
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

    this.isMobileOrTablet = this.isMobileOrTabletFunc();

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.deferredPrompt = e;
      });

      window.addEventListener('appinstalled', () => {
        console.log('✅ L’application a été installée');
        this.deferredPrompt = null;
      });
    }
  }

  installPwa() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isApple) {
        window.alert('Installez l’app via “Partager > Sur l’écran d’accueil”');
        return;
      }

      this.deferredPrompt.prompt();
      this.deferredPrompt = null;
    }
  }

  isMobileOrTabletFunc() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }
}
