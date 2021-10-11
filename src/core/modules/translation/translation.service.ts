import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { translateOptions } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class TranslationService {
  constructor(private i18n: I18nService) {}

  translate(key: string, options?: translateOptions): Promise<any> {
    return this.i18n.translate(key, options);
  }

  t(key: string, options?: translateOptions): Promise<any> {
    return this.i18n.t(key, options);
  }
}
