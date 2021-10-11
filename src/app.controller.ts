import { Controller, Get } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { AppService } from './app.service';
import { LoggerService } from './core/modules/logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private i18n: I18nService,
    private logger: LoggerService,
    private appService: AppService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }
}
