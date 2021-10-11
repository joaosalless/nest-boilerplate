import { registerAs } from '@nestjs/config';
import { ClientOptions } from '@elastic/elasticsearch';

export default registerAs('elasticsearch', async (): Promise<ClientOptions> => {
  return Promise.resolve({
    node: process.env.ELASTICSEARCH_URL,
    auth: {
      username: process.env.ELASTICSEARCH_USERNAME,
      password: process.env.ELASTICSEARCH_PASSWORD,
    },
  });
});
