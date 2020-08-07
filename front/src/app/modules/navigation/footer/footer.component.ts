import { Component, OnInit } from '@angular/core';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { Picture } from 'src/app/model/model';
import { basePicturePath } from '../../../helpers/constants';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public instaPath: string;
  public show = 0;
  public logo: Picture;
  public basePicturePath = basePicturePath;

  constructor(private pictureApiService: PicturesApiService) { }

  ngOnInit(): void {
    this.pictureApiService.getBySpec('Logo').subscribe(res => {
      this.logo = res[0];
    }, err => {
      console.log(err)
    });

    this.instaPath = basePicturePath + '/Autres/instagram-logo.jpg'
  }

  redirectInstagram() {
    window.open('https://www.instagram.com/marieservaneblt/', '_blank');
  }

}
