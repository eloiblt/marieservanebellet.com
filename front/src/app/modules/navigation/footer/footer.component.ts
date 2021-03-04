import { Component, OnInit } from '@angular/core';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { Picture } from 'src/app/model/model';
import { basePicturePath, etsyUrl, githubUrl, instaUrl } from '../../../helpers/constants';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public instaPath: string;
  public etsyPath: string;
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

    this.instaPath = basePicturePath + '/instagram-logo.jpg';
    this.etsyPath = basePicturePath + '/etsy-logo.jpg';
  }

  redirectInstagram() {
    window.open(instaUrl, '_blank');
  }

  redirectEtsy() {
    window.open(etsyUrl, '_blank');
  }

  redirectProfile() {
    window.open(githubUrl, '_blank');
  }

}
