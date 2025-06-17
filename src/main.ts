import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const nodeEnv = configService.get<string>('NODE_ENV');
  const isDevelopment = nodeEnv === 'development';
  const uploadsPath = isDevelopment
    ? join(__dirname, '..', 'uploads')
    : join(__dirname, '..', '..', 'uploads');

  app.useStaticAssets(uploadsPath, {
    prefix: '/uploads/',
  });

  console.log(`Environment: ${nodeEnv}`);
  console.log(`Static assets serving from: ${uploadsPath}`);

  const port = configService.get<number>('PORT') || 5100;
  await app.listen(port);
}
bootstrap();
