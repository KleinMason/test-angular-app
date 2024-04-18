import { readFileSync } from 'fs';
import { inject, injectable } from 'inversify';
import { sign, verify } from 'jsonwebtoken';
import * as moment from 'moment';
import { User } from 'test-angular-database';
import { TYPES } from '../../composition/app.composition.types';
import { AppConfig } from '../../models/app.config';
import { AccessToken } from '../../models/auth/access-token';
import { JwtConfig } from '../../models/jwt.config';

export interface ITokenService {
  getBearerTokenForUser: (user: User) => string;
  getAccessToken: (accessToken: string) => AccessToken;
}

@injectable()
export class TokenService implements ITokenService {
  private jwtConfig: JwtConfig;

  constructor(@inject(TYPES.AppConfig) private config: AppConfig) {
    this.jwtConfig = this.config.jwtConfig;
  }

  getBearerTokenForUser = (user: User): string => {
    const RSA_PRIVATE_KEY = readFileSync(
      this.jwtConfig.rsaPrivateKeyPath,
      'utf8',
    );
    const accessToken: AccessToken = {
      userId: user.userId,
      email: user.email,
      permissions: [],
      expires: moment().add(1, 'day').toDate().toISOString(),
    };
    return sign(accessToken, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
    });
  };

  getAccessToken = (accessToken: string): AccessToken => {
    const RSA_PUBLIC_KEY = readFileSync(
      this.jwtConfig.rsaPublicKeyPath,
      'utf8',
    );
    try {
      const token = verify(accessToken, RSA_PUBLIC_KEY, {
        algorithms: ['RS256'],
      }) as AccessToken;
      return token;
    } catch (_err) {
      return null;
    }
  };
}
