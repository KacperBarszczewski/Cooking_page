import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeders/seeder.service';
import { json } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(json({ limit: '10mb' }));

  const seeder = app.get(SeederService);
  await seeder.seed();

  await app.listen(3000);
}
bootstrap();
