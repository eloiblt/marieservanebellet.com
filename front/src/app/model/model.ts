import { EShapePainting, ESpecPainting } from './enum';

export class Painting {
  id: number;
  title: string;
  technique: string;
  gridColumn: string;
  gridrow: string;
  category: CategoryPainting;
  shape: EShapePainting;
  spec: ESpecPainting;   // ambiance // menu
  date: string;
}

export class CategoryPainting {
  id: number;
  title: string;
}
