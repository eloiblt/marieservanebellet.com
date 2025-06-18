import { Component } from '@angular/core';
import { githubUrl, instaUrl } from '../../helpers/constants';
import { environment } from '../../../environments/environment';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [NgClass, RouterLink, NgOptimizedImage],
})
export class FooterComponent {
  public show = 0;
  public environment = environment;

  redirectInstagram() {
    window.open(instaUrl, '_blank');
  }

  redirectProfile() {
    window.open(githubUrl, '_blank');
  }
}
