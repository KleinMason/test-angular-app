import { injectable } from 'inversify';
import pino, { Logger } from 'pino';

export interface ILoggerService {
  info(obj: unknown, msg?: string, ...args: any[]): void;
  error(obj: unknown, msg?: string, ...args: any[]): void;
}

@injectable()
export class LoggerService implements ILoggerService {
  private logger: Logger;

  constructor() {
    this.logger = pino({
      formatters: {
        level: (label) => {
          return { level: label };
        },
      },
      redact: [],
      // transport: {
      //   target: 'pino-pretty',
      // },
    });
  }

  info = (obj: unknown, msg?: string, ...args: any[]) => {
    this.logger.info(obj, msg, ...args);
  };

  error = (obj: unknown, msg?: string, ...args: any[]) => {
    this.logger.error(obj, msg, ...args);
  };
}
