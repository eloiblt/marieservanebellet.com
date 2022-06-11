import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoryModule } from './modules/category/category.module';
import { PicturesModule } from './modules/pictures/pictures.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [PicturesModule, CategoryModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
