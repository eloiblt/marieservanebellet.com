import { EShapePicture, ESpecPicture } from './enum';

export class Picture {
  id: number;
  title: string;
  technique: string;
  gridColumn: string;
  gridrow: string;
  categoryId: number;
  shape: EShapePicture;
  spec: ESpecPicture;   // ambiance // menu
  date: string;
  url: string;
  size: string;
}

export class CategoryPicture {
  id: number;
  title: string;
}

export class User {
  mail: string;
  password: string;
}
