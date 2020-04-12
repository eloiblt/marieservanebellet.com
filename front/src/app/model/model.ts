export class Picture {
  id: number;
  title: string;
  technique: string;
  gridColumn: string;
  gridrow: string;
  categoryId: number;
  shape: string;
  spec: string;   // ambiance // menu
  date: string;
  url: string;
  size: string;
}

export class CategoryPicture {
  id: number;
  name: string;
}

export class User {
  mail: string;
  password: string;
}
