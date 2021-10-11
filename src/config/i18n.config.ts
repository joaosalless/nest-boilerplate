import * as path from 'path';
import { registerAs } from '@nestjs/config';
import { I18nOptionsWithoutResolvers } from 'nestjs-i18n/dist/interfaces/i18n-options.interface';

export default registerAs(
  'i18n',
  async (): Promise<I18nOptionsWithoutResolvers> => {
    return Promise.resolve({
      fallbackLanguage: 'pt',
      fallbacks: { pt: 'pt' },
      parserOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
    });
  },
);
