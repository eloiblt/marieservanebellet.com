import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoryModule } from './modules/category/category.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { PictureModule } from './modules/picture/pictureModule';

@Module({
  imports: [CategoryModule, PictureModule, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
