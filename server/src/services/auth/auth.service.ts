import { inject, injectable } from "inversify";
import { IUserService } from "../user.service";
import { SERVICE_TYPES } from "../../composition/app.composition.types";
import * as bcrypt from "bcrypt";
import { User } from "test-angular-database";

export interface IAuthService {
  login: (email: string, password: string) => Promise<User>;
}

@injectable()
export class AuthService {
  constructor(
    @inject(SERVICE_TYPES.UserService) private userService: IUserService
  ) {}

  login = async (email: string, password: string): Promise<User> => {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new Error("User not found");
    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordMatch) throw new Error("Invalid password");
    return user;
  };
}
