import { AfterViewInit, Component, inject, PLATFORM_ID } from '@angular/core';
import { PictureComponent } from '../picture/picture.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [PictureComponent],
})
export class AboutComponent implements AfterViewInit {
  public show = false;

  private readonly platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('about')?.scrollIntoView();
    }
  }
}
