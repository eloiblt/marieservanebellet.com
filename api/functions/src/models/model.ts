import { EShapePainting, ESpecPainting } from "./enum";

export class Picture {
  id!: number;
  title!: string;
  technique!: string;
  gridColumn!: string;
  gridrow!: string;
  categoryId!: number;
  shape!: EShapePainting;
  spec!: ESpecPainting; // ambiance // menu
  date!: string;
  url!: string;
  size!: string;
}

export class CategoryPictures {
  id!: number;
  title!: string;
}

export class User {
  mail!: string;
  password!: string;
}
