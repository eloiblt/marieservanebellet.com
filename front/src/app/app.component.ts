import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
declare var gtag;
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    router: Router
  ) {
    if (environment.production) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-164004514-1';
      document.head.prepend(script);
    }

    const navEndEvents = router.events.pipe(
      filter(
        event => event instanceof NavigationEnd
      )
    );

    navEndEvents.subscribe(
      (event: NavigationEnd) => {
        gtag('config', 'UA-164004514-1', {
          page_path: event.urlAfterRedirects,
        });
      }
    );
  }
}
