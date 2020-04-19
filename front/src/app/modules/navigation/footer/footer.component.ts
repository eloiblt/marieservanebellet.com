import { Component, OnInit } from '@angular/core';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { Picture } from 'src/app/model/model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public logoPath = '../../../../assets/pictures/logo.jpg';
  public instaPath = '../../../../assets/pictures/instagram-logo.jpg';
  public show = false;

  constructor(private pictureApiService: PicturesApiService) { }

  ngOnInit(): void {
  }

  redirectInstagram() {
    window.open('https://www.instagram.com/marieservaneblt/', '_blank');
  }

}
