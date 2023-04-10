export class Picture {
  id: number;
  title: string;
  technique: string;
  gridColumn: string;
  gridRow: string;
  categoryId: number;
  year: number;
  url: string;
  size: string;
  isMenu: boolean;
}

export class CategoryPicture {
  id: number;
  title: string;
  show: boolean;
  coverUrl: string;
}

export class User {
  mail: string;
  password: string;
}
