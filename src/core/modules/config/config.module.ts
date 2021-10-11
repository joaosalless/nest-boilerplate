import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfigModule } from '../app-config/app-config.module';
import applicationConfig from '../../../config/application.config';
import databaseConfig from '../../../config/database.config';
import i18nConfig from '../../../config/i18n.config';
import elasticsearchConfig from '../../../config/elasticsearch.config';
import sentryConfig from '../../../config/sentry.config';

@Module({
  imports: [
    AppConfigModule,
    NestConfigModule.forRoot({
      load: [
        applicationConfig,
        databaseConfig,
        i18nConfig,
        elasticsearchConfig,
        sentryConfig,
      ],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
