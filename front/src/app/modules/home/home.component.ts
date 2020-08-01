import { Component, OnInit } from '@angular/core';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public ambiancePicturesPath = 'https://marieservanebellet.com:5001/Bandeau page d\'accueil 6.png';
  public show = false;

  constructor(private pictureApiService: PicturesApiService) { }

  ngOnInit(): void {
  }

}
