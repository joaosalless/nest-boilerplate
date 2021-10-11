import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../core/entities/user.entity';
import { LoggerModule } from '../core/modules/logger/logger.module';
import { SearchModule } from '../core/modules/search/search.module';
import { TranslationModule } from '../core/modules/translation/translation.module';
import { UserSearchService } from './user-search.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    SearchModule,
    ConfigModule,
    LoggerModule,
    TranslationModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, UserSearchService],
})
export class UserModule {}
