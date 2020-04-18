import { Component, OnInit } from '@angular/core';
import { Picture } from 'src/app/model/model';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public ambiancePicturesPath = '../../../assets/pictures/Bandeau page d\'accueil 5.jpg';
  public show = false;

  constructor(private pictureApiService: PicturesApiService) { }

  ngOnInit(): void {
  }

}
