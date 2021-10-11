import { CallumaAppConfig } from '@callumatech/lib-calluma';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

interface AppConfigPayload {
  namespace: string;
  application: string;
  environment: string;
}

@Injectable()
export class AppConfigService {
  constructor(private readonly logger: LoggerService) {}

  public async get(payload: AppConfigPayload[]): Promise<any> {
    const config: any = {};
    const promises: Promise<any>[] = [];

    this.logger.log('Getting AppConfigs', { payload });

    payload.forEach((p: AppConfigPayload) => {
      this.logger.log('Getting AppConfig', p);
      promises.push(
        CallumaAppConfig.get(p.application, p.environment).then((data) => {
          config[p.namespace] = { ...data };
        }),
      );
    });

    await Promise.all(promises);

    return Promise.resolve(config);
  }
}
