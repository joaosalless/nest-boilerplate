import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './core/middlewares/auth.middleware';
import { ConfigModule } from './core/modules/config/config.module';
import { DatabaseModule } from './core/modules/database/database.module';
import { LoggerModule } from './core/modules/logger/logger.module';
import { TranslationModule } from './core/modules/translation/translation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    TranslationModule,
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [LoggerModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
