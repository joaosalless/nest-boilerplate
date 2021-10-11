import { ConfigModule, ConfigService } from '@nestjs/config';
import { I18nOptionsWithoutResolvers } from 'nestjs-i18n/dist/interfaces/i18n-options.interface';
import { Module } from '@nestjs/common';
import {
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { TranslationService } from './translation.service';

@Module({
  imports: [
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<I18nOptionsWithoutResolvers>('i18n'),
      }),
      parser: I18nJsonParser,
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale'] },
        new HeaderResolver(['x-custom-lang']),
      ],
    }),
  ],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
