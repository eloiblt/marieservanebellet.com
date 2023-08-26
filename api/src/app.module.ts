import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoryModule } from './modules/category/category.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PictureModule } from './modules/picture/pictureModule';
import { AuthModule } from './modules/auth/auth.module';
import { ContactModule } from './modules/contact/contact.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    CategoryModule,
    PictureModule,
    AuthModule,
    PrismaModule,
    ContactModule,
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
