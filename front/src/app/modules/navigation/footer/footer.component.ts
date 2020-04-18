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
  public show = false;

  constructor(private pictureApiService: PicturesApiService) { }

  ngOnInit(): void {
  }

}
