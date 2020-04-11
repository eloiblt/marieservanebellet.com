import { Component, OnInit } from '@angular/core';
import { Painting, CategoryPainting } from 'src/app/model/model';
import { PaintingApiService } from 'src/app/services/api/painting-api.service';
import { CategoryPaintingApiService } from 'src/app/services/api/categoryPainting-api.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public newPainting: Painting;
  public paintings: Painting[];
  public categoryPaintings: CategoryPainting[];

  constructor(
    private paintingApiService: PaintingApiService,
    private categoryPaintingApiService: CategoryPaintingApiService
  ) { }

  ngOnInit(): void {
    this.newPainting = new Painting();
    this.getPaintings();
    this.getCategoryPaintings();
  }

  getPaintings() {
    this.paintingApiService.get().subscribe(res => {
      this.paintings = res;
      this.newPainting.id = 1;
      while (this.paintings.find(p => p.id === this.newPainting.id)) {
        this.newPainting.id++;
      }
    }, err => {
      console.log(err);
    });
  }

  getCategoryPaintings() {
    this.categoryPaintingApiService.get().subscribe(res => {
      this.categoryPaintings = res;
    }, err => {
      console.log(err);
    });
  }

  createNewPainting() {
    if (this.canCreate()) {
      this.paintingApiService.create(this.newPainting).subscribe(res => {
        this.newPainting = new Painting();
        this.getPaintings();
      }, err => {
        console.log(err);
      });
    }
  }

  update(p: Painting) {
    this.paintingApiService.update(p.id, p).subscribe(res => {
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
      this.categoryPaintings.find(c => c.id === this.newPainting.categoryId) &&
      this.newPainting.shape &&
      this.newPainting.spec &&
      this.newPainting.date &&
      this.newPainting.url &&
      this.newPainting.size;
  }
}
