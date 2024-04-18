import * as bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import { isTokenExpired } from 'test-angular-library';
import { SERVICE_TYPES } from '../../composition/app.composition.types';
import { AccessToken } from '../../models/auth/access-token';
import { AuthStatusCode } from '../../models/auth/auth-status-code';
import { TokenData } from '../../models/auth/token-data';
import { ILoggerService } from '../logger.service';
import { ITokenService } from '../token/token.service';
import { IUserService } from '../user/user.service';

export interface IAuthService {
  authenticateUser: (email: string, password: string) => Promise<boolean>;
  getTokenData: (token: string) => TokenData;
  authorize: (
    accessToken: string,
    permissions: string[],
    connector?: string,
  ) => AuthStatusCode;
}

@injectable()
export class AuthService {
  constructor(
    @inject(SERVICE_TYPES.LoggerService) private logger: ILoggerService,
    @inject(SERVICE_TYPES.UserService) private userService: IUserService,
    @inject(SERVICE_TYPES.TokenService) private tokenService: ITokenService,
  ) {}

  authenticateUser = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    const user = await this.userService.getUserByEmail(email);
    if (!user) return false;
    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordMatch) return false;
    return true;
  };

  getTokenData = (token: string): TokenData => {
    if (token == null || token.match(/^Bearer .*/) == null) return null;
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2) return null;
    const tokenData = new TokenData(tokenParts[0], tokenParts[1]);
    return tokenData;
  };

  authorize = (
    accessToken: string,
    permissions: string[],
    connector: string = 'AND',
  ): AuthStatusCode => {
    const token = this.tokenService.getAccessToken(accessToken);
    this.logger.info(token);
    if (token == null) return AuthStatusCode.InvalidToken;
    const expired = isTokenExpired(token.expires);
    if (expired) return AuthStatusCode.TokenExpired;
    const hasPermissions = this.hasPermissions(token, permissions, connector);
    return hasPermissions
      ? AuthStatusCode.Authorized
      : AuthStatusCode.PermissionDenied;
  };

  private hasPermissions(
    accessToken: AccessToken,
    permissions: string[],
    connector: string,
  ): boolean {
    return connector === 'AND'
      ? this.hasAllPermissions(accessToken, permissions)
      : this.hasAnyPermissions(accessToken, permissions);
  }

  private hasAllPermissions(
    accessToken: AccessToken,
    permissions: string[],
  ): boolean {
    return permissions.every((permission) =>
      accessToken.permissions.includes(permission),
    );
  }

  private hasAnyPermissions(
    accessToken: AccessToken,
    permissions: string[],
  ): boolean {
    return permissions.some((permission) =>
      accessToken.permissions.includes(permission),
    );
  }
}
