import { Collection, DatabaseContext } from 'mysql-shaman';
import { Blog } from './models/blog';
import { User } from './models/user';

export interface ITestDatabaseContext {
  models: {
    blog: Collection<Blog>;
    user: Collection<User>;
  };
  runQuery: <T>(query: string, args: any) => Promise<T>;
}

export class TestDatabaseContext
  extends DatabaseContext
  implements ITestDatabaseContext
{
  models = {
    blog: new Collection<Blog>(),
    user: new Collection<User>(),
  };

  runQuery = <T>(query: string, args: any): Promise<T> => {
    return this.query<T>(query, args);
  };
}
