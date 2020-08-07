import * as mongoose from 'mongoose';

export class Picture {
  id!: number;
  title!: string;
  technique!: string;
  gridColumn!: string;
  gridrow!: string;
  categoryId!: number;
  spec!: string; // ambiance // menu
  date!: string;
  url!: string;
  size!: string;
}

export class CategoryPictures {
  id!: number;
  name!: string;
  show!: boolean;
}

export class User {
  mail!: string;
  password!: string;
}

export const PictureCollection = mongoose.model('pictures', new mongoose.Schema({
  id: Number,
  title: String,
  technique: String,
  gridColumn: String,
  gridrow: String,
  categoryId: Number,
  spec: String, // ambiance // menu
  date: String,
  url: String,
  size: String
}, { collection: 'pictures' }));

export const CategoryPicturesCollection = mongoose.model('categoryPictures', new mongoose.Schema({
  id: Number,
  name: String,
  show: Boolean
}, { collection: 'categoryPictures' }));

export const UserCollection = mongoose.model('users', new mongoose.Schema({
  mail: String,
  password: String
}, { collection: 'users' }));
