import { Component, OnInit } from '@angular/core';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { Picture } from '../../model/model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public show = false;
  public environment = environment;

  constructor(private pictureApiService: PicturesApiService) {}

  ngOnInit(): void {}
}
