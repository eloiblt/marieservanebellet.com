import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { Picture } from 'src/app/model/model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public logo: Picture;
  public loading = true;
  public picturesPath = '../../../../assets/pictures/';
  public showMenu = false;

  constructor(
    private pictureApiService: PicturesApiService
  ) { }

  ngOnInit(): void {
    this.pictureApiService.getBySpec('Logo').subscribe(res => {
      this.logo = res[0];
      this.loading = false;
    }, err => {
      console.log(err);
    });
  }

}
