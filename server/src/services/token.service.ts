import { injectable, inject } from "inversify";
import * as jwt from "jsonwebtoken";
import { AppConfig } from "../models/app.config";
import { JwtConfig } from "../models/jwt.config";
import { TYPES } from "../composition/app.composition.types";
import { readFileSync } from "fs";

export interface ITokenService {
  getBearerTokenForUserId: (userId: number) => string;
}

@injectable()
export class TokenService implements ITokenService {
  private jwtConfig: JwtConfig;

  constructor(@inject(TYPES.AppConfig) private config: AppConfig) {
    this.jwtConfig = this.config.jwtConfig;
  }

  getBearerTokenForUserId = (userId: number): string => {
    const RSA_PRIVATE_KEY = readFileSync(
      this.jwtConfig.rsaPrivateKeyPath,
      "utf8"
    );
    return jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: this.jwtConfig.expiresIn,
      subject: userId.toString()
    });
  };
}
