// import { CallumaAppConfig } from '@callumatech/lib-calluma';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { UserToken } from '../core/entities/user-token.entity';
import { User } from '../core/entities/user.entity';

export default registerAs(
  'database.legacy',
  async (): Promise<TypeOrmModuleOptions> => {
    try {
      // const config: DatabaseConfig = await CallumaAppConfig.get(
      //   'database-legacy',
      //   process.env.ENV,
      // ).then((data) => data);

      const config: TypeOrmModuleOptions = {
        type: 'postgres',
        synchronize: false,
        // logging: 'all',
        name: 'LEGACY_DB',
        database: 'kamel_calluma',
        entities: [User, UserToken],
        replication: {
          master: {
            host: 'localhost',
            port: 7887,
            username: 'kamel_calluma',
            password: '123',
          },
          slaves: [
            {
              host: 'localhost',
              port: 7887,
              username: 'kamel_calluma',
              password: '123',
            },
          ],
        },
      };

      return Promise.resolve(config);
    } catch (error) {
      throw error;
    }
  },
);
