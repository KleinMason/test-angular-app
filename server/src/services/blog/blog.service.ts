import { inject, injectable } from 'inversify';
import { Blog } from 'test-angular-database';
import { ITestDatabaseContext } from 'test-angular-database/dist/database.context';
import { SERVICE_TYPES, TYPES } from '../../composition/app.composition.types';
import { ILoggerService } from '../logger.service';

export interface IBlogService {
  getAllBlogs(): Promise<Blog[]>;
}

@injectable()
export class BlogService implements IBlogService {
  constructor(
    @inject(SERVICE_TYPES.LoggerService) private logger: ILoggerService,
    @inject(TYPES.TestDatabaseContext) private db: ITestDatabaseContext,
  ) {}

  getAllBlogs = (): Promise<Blog[]> => {
    return this.db.models.blog.find();
  };
}
