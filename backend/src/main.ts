import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger } from '@nestjs/common';
import * as compression from 'compression';
import { PrismaService } from './modules/prisma/prisma.service';

async function bootstrap() {
  const logger = new ConsoleLogger({
    logLevels: ['verbose', 'debug', 'log', 'warn', 'error', 'fatal'],
  });

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger,
  });

  const config = new DocumentBuilder()
    .setTitle('MSB API')
    .setDescription('MSB API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.use(compression());
  app.enableCors({ origin: process.env.FRONT_URL });

  await app.listen(4000);

  try {
    await app.get(PrismaService).$connect();
    logger.log('Prisma DB connection successful');
  } catch (error) {
    logger.error('Prisma DB connection failed', error);
    process.exit(1);
  }

  logger.log('Listening on http://localhost:4000');
}
bootstrap();
