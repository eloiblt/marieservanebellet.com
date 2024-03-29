import { Component, OnInit } from '@angular/core';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { Picture } from 'src/app/model/model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public showMenu = false;
  public show = false;
  public environment = environment;

  constructor(
    private pictureApiService: PicturesApiService
  ) { }

  ngOnInit(): void {
  }

}
