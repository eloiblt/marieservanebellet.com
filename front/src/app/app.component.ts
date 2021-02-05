import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';

declare var gtag;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {

    if (environment.production) {
      const gaId = "G-KXQW1H217D";

      const gTagManagerScript = document.createElement('script');
      gTagManagerScript.async = true;
      gTagManagerScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
      document.head.appendChild(gTagManagerScript);

      // register google analytics
      const gaScript = document.createElement('script');
      gaScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
      `;
      document.head.appendChild(gaScript);

      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe((e: NavigationEnd) => {
        gtag('config', gaId, {'page_path': e.urlAfterRedirects});
      });
    }

  }
}
