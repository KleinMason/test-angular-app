import { inject, injectable } from "inversify";
import { ITestDatabaseContext, User } from "test-angular-database";
import * as bcrypt from "bcrypt";
import { TYPES } from "../composition/app.composition.types";

export interface IUserService {
  getUserById: (id: number) => Promise<User>;
  getUserByEmail: (email: string) => Promise<User>;
  getAllUsers: () => Promise<User[]>;
  getUserIdForEmail: (email: string) => Promise<number>;
  addUser: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<User>;
}

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.TestDatabaseContext) private db: ITestDatabaseContext
  ) {}

  getUserById = async (id: number): Promise<User> => {
    return this.db.models.user.findOne({
      identity: "userId",
      args: [id]
    });
  };

  getAllUsers = async (): Promise<User[]> => {
    return this.db.models.user.find();
  };

  getUserByEmail = async (email: string): Promise<User> => {
    return this.db.models.user.findOne({
      identity: "email",
      args: [email]
    });
  };

  getUserIdForEmail = async (email: string): Promise<number> => {
    const user = await this.getUserByEmail(email);
    return user.userId;
  };

  addUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<User> => {
    const passwordHash = await bcrypt.hash(password, 10);
    const user: User = {
      firstName,
      lastName,
      email,
      passwordHash
    };
    const userId = await this.db.models.user.insertOne(user);
    const newUser = await this.getUserById(userId);
    return newUser;
  };
}
