import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoryModule } from './category/category.module';
import { PicturesModule } from './pictures/pictures.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PicturesModule, CategoryModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
