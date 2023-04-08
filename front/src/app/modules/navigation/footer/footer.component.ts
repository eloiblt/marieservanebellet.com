import { Component, OnInit } from '@angular/core';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { Picture } from 'src/app/model/model';
import { githubUrl, instaUrl } from '../../../helpers/constants';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public show = 0;
  public environment = environment;

  constructor() {}

  ngOnInit(): void {}

  redirectInstagram() {
    window.open(instaUrl, '_blank');
  }

  redirectProfile() {
    window.open(githubUrl, '_blank');
  }
}
