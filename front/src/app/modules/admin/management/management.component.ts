import { Component, OnInit } from '@angular/core';
import { Painting } from 'src/app/model/model';
import { PaintingApiService } from 'src/app/services/api/painting-api.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public newPainting: Painting;
  public paintings: Painting[];

  constructor(private paintingApiService: PaintingApiService) { }

  ngOnInit(): void {
    this.newPainting = new Painting();
    this.getPaintings();
  }

  getPaintings() {
    this.paintingApiService.get().subscribe(res => {
      this.paintings = res;
    }, err => {
      console.log(err);
    });
  }

  createNewPainting() {
    console.log(this.newPainting);
    this.paintingApiService.create(this.newPainting).subscribe(res => {
      this.newPainting = new Painting();
    }, err => {
      console.log(err);
    });
  }

  update(p: Painting) {
    console.log('update');
    this.paintingApiService.update(p.id, p).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  canCreate() {
    return this.newPainting.id &&
      this.newPainting.title &&
      this.newPainting.technique &&
      this.newPainting.gridColumn &&
      this.newPainting.gridrow &&
      this.newPainting.categoryId &&
      this.newPainting.shape &&
      this.newPainting.spec &&
      this.newPainting.date &&
      this.newPainting.url;
  }
}
