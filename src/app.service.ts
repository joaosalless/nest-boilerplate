import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './core/modules/logger/logger.service';
import { TranslationService } from './core/modules/translation/translation.service';
// import { DatabaseContex } from './config/database.config';

@Injectable()
export class AppService {
  constructor(
    private i18n: TranslationService,
    private logger: LoggerService,
    private config: ConfigService,
  ) {}

  async getHello(): Promise<string> {
    // const config = this.config.get<DatabaseContex>('database.main.ro');
    // this.logger.log(config);

    // throw new Error('Error');
    // throw new InternalServerErrorException();

    return await this.i18n.t('global.name', {
      args: { version: '1.0.0' },
    });
  }
}
