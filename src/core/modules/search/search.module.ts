import { ClientOptions } from '@elastic/elasticsearch';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<ClientOptions>('elasticsearch'),
      }),
    }),
  ],
  exports: [ElasticsearchModule],
})
export class SearchModule {}
