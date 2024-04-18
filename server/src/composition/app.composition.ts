/* istanbul ignore file */
import { Container } from 'inversify';
import 'reflect-metadata';
import { SHAMAN_API_TYPES } from 'shaman-api';
import {
  ITestDatabaseContext,
  TestDatabaseContext,
} from 'test-angular-database';
import { AuthController } from '../controllers/auth/auth.controller';
import { BlogController } from '../controllers/blog/blog.controller';
import { HealthController } from '../controllers/health/health.controller';
import { UserController } from '../controllers/user/user.controller';
import { AppConfig } from '../models/app.config';
import { AuthService, IAuthService } from '../services/auth/auth.service';
import { BlogService, IBlogService } from '../services/blog/blog.service';
import { ILoggerService, LoggerService } from '../services/logger.service';
import { ITokenService, TokenService } from '../services/token/token.service';
import { IUserService, UserService } from '../services/user/user.service';
import { SERVICE_TYPES, TYPES } from './app.composition.types';

export async function Compose(container: Container): Promise<Container> {
  const config = container.get<AppConfig>(SHAMAN_API_TYPES.AppConfig);
  await configureServices(container, config);
  await configureRouter(container);
  await configureDataContext(container, config);
  return container;
}

function configureServices(
  container: Container,
  _config: AppConfig,
): Promise<Container> {
  container.bind<IAuthService>(SERVICE_TYPES.AuthService).to(AuthService);
  container.bind<IBlogService>(SERVICE_TYPES.BlogService).to(BlogService);
  container.bind<ILoggerService>(SERVICE_TYPES.LoggerService).to(LoggerService);
  container.bind<ITokenService>(SERVICE_TYPES.TokenService).to(TokenService);
  container.bind<IUserService>(SERVICE_TYPES.UserService).to(UserService);
  return Promise.resolve(container);
}

function configureRouter(container: Container): Promise<Container> {
  container
    .bind<HealthController>(SHAMAN_API_TYPES.ApiController)
    .to(HealthController);
  container
    .bind<AuthController>(SHAMAN_API_TYPES.ApiController)
    .to(AuthController);
  container
    .bind<UserController>(SHAMAN_API_TYPES.ApiController)
    .to(UserController);
  container
    .bind<BlogController>(SHAMAN_API_TYPES.ApiController)
    .to(BlogController);
  return Promise.resolve(container);
}

function configureDataContext(
  container: Container,
  config: AppConfig,
): Promise<Container> {
  return new Promise((res) => {
    let context = new TestDatabaseContext();
    context.initialize(config.mysqlConfig);
    container
      .bind<ITestDatabaseContext>(TYPES.TestDatabaseContext)
      .toConstantValue(context);
    res(container);
  });
}
