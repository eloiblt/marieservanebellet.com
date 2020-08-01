import { Component, OnInit } from '@angular/core';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { Picture } from 'src/app/model/model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public logoPath = 'https://marieservanebellet.com:5001/logo.jpg';
  public instaPath = 'https://marieservanebellet.com:5001/instagram-logo.jpg';
  public show = 0;

  constructor(private pictureApiService: PicturesApiService) { }

  ngOnInit(): void {
  }

  redirectInstagram() {
    window.open('https://www.instagram.com/marieservaneblt/', '_blank');
  }

}
