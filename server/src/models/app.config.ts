import { PoolConfig } from 'mysql';
import { JwtConfig } from './jwt.config';

export class AppConfig {
  port: string;
  mysqlConfig: PoolConfig;
  jwtConfig: JwtConfig;
}
