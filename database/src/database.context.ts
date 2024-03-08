import { DatabaseContext, Collection } from "mysql-shaman";
import { User } from "./models/user";

export interface ITestDatabaseContext {
  models: {
    user: Collection<User>;
  };
  runQuery: <T>(query: string, args: any) => Promise<T>;
}

export class TestDatabaseContext
  extends DatabaseContext
  implements ITestDatabaseContext
{
  models = {
    user: new Collection<User>()
  };

  runQuery = <T>(query: string, args: any): Promise<T> => {
    return this.query<T>(query, args);
  };
}
