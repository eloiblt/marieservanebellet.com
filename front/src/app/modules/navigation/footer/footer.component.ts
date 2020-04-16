import { Component, OnInit } from '@angular/core';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { Picture } from 'src/app/model/model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public logo: Picture;
  public loading = true;
  public picturesPath = '../../../../assets/pictures/';

  constructor(private pictureApiService: PicturesApiService) { }

  ngOnInit(): void {
    this.pictureApiService.getBySpec('Logo').subscribe(res => {
      this.logo = res[0];
      this.loading = false;
    }, err => {
      console.log(err);
    });
  }

}
