import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { createConnection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<TypeOrmModuleOptions>('database.legacy'),
        applicationName: configService.get<string>('application.name'),
      }),
      connectionFactory: async (options) => {
        return await createConnection(options);
      },
    }),
  ],
})
export class DatabaseModule {}
