import { registerAs } from '@nestjs/config';

export interface ApplicationConfig {
  name: string;
  env: string;
}

export default registerAs(
  'application',
  async (): Promise<ApplicationConfig> => {
    return Promise.resolve({
      name: process.env.SERVICE_NAME || 'microservice-template',
      env: process.env.ENV || 'development',
    });
  },
);
