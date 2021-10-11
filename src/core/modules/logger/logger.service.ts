import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  info(message: any, context?: string): void {
    console.log(message, context);
  }
}
