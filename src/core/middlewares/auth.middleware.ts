import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthenticatedUserDto } from '../dto/authenticated-user-dto';
import { LoggerService } from '../modules/logger/logger.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(req: any, res: any, next: () => void) {
    // @TODO: Pegar dados do usuário via authorizer
    const user = new AuthenticatedUserDto(
      123,
      'User 1',
      null,
      'john.doe@mail.com',
      'seller',
    );

    res.app.set('AUTHENTICATED_USER', user);
    this.logger.info('AUTHENTICATED_USER', res.app.get('AUTHENTICATED_USER'));

    next();
  }
}
