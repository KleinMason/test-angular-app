import * as bcrypt from "bcrypt";
import { inject, injectable } from "inversify";
import { SERVICE_TYPES } from "../../composition/app.composition.types";
import { IUserService } from "../user.service";

export interface IAuthService {
  authenticateUser: (email: string, password: string) => Promise<boolean>;
}

@injectable()
export class AuthService {
  constructor(
    @inject(SERVICE_TYPES.UserService) private userService: IUserService
  ) {}

  authenticateUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const user = await this.userService.getUserByEmail(email);
    if (!user) return false;
    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordMatch) return false;
    return true;
  };
}
