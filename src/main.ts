import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { NestFactory } from '@nestjs/core';
import { NodeOptions } from '@sentry/node/dist/types';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './core/filters/all-exceptions.filter';
import { LoggerService } from './core/modules/logger/logger.service';
import { SentryInterceptor } from './core/interceptors/sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  Sentry.init(configService.get<NodeOptions>('sentry'));
  app.useLogger(new LoggerService());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new SentryInterceptor());

  await app.listen(3000);
}
bootstrap();
