import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { Picture } from 'src/app/model/model';
import { basePicturePath } from '../../../helpers/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public showMenu = false;
  public show = false;
  public logo: Picture;
  public basePicturePath = basePicturePath;

  constructor(
    private pictureApiService: PicturesApiService
  ) { }

  ngOnInit(): void {
    this.pictureApiService.getBySpec('Logo').subscribe(res => {
      this.logo = res[0];
    }, err => {
      console.log(err)
    });
  }

}
