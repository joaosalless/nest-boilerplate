import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { AppConfigService } from './app-config.service';

@Module({
  imports: [LoggerModule],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
