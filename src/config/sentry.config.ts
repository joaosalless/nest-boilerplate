import { NodeOptions } from '@sentry/node/dist/types';
import { registerAs } from '@nestjs/config';

export default registerAs('sentry', async (): Promise<NodeOptions> => {
  return Promise.resolve({
    enabled: true,
    environment: process.env.ENV || 'development',
    dsn: process.env.SENTRY_DSN,
  });
});
