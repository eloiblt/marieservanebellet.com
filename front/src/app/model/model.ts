export class Picture {
  id: number;
  title: string;
  technique: string;
  gridColumn: string;
  gridrow: string;
  categoryId: number;
  spec: string;   // ambiance // menu
  date: string;
  url: string;
  size: string;
}

export class CategoryPicture {
  id: number;
  name: string;
  show: boolean;
}

export class User {
  mail: string;
  password: string;
}
