import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoryModule } from './modules/category/category.module';
import { PictureModule } from './modules/picture/pictureModule';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ContactModule } from './modules/contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { AppLoggerMiddleware } from './app-logger.middleware';

@Module({
  imports: [
    CategoryModule,
    PictureModule,
    AuthModule,
    PrismaModule,
    ContactModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
