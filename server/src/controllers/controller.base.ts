import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { AuthStatusCode, RouteError } from 'shaman-api';
import { IAuthService } from '../services/auth/auth.service';

const BEARER_TYPE = 'Bearer';

@injectable()
export class ControllerBase {
  constructor(
    private authService: IAuthService,
    private permissions: string[] = [],
  ) {}

  protected authorize = (req: Request, _res: Response, next: any): void => {
    const tokenData = this.authService.getTokenData(req.headers.authorization);
    if (!tokenData || tokenData.tokenType != BEARER_TYPE) {
      return this.notAuthorized('Invalid token', next);
    }
    const authStatusCode = this.authService.authorize(
      tokenData.tokenValue,
      this.permissions,
    );
    switch (+authStatusCode) {
      case AuthStatusCode.Authorized:
        return next();
      case AuthStatusCode.InvalidToken:
        return this.notAuthorized('Invalid token', next, 400);
      case AuthStatusCode.PermissionDenied:
        return this.notAuthorized('Permission denied', next, 403);
      case AuthStatusCode.TokenExpired:
        return this.notAuthorized('Token expired', next, 401);
      default:
        return this.notAuthorized('Authorization error', next, 401);
    }
  };

  private notAuthorized = (
    message: string,
    next: any,
    statusCode: number = 401,
  ): void => {
    next(new RouteError(message, statusCode));
  };
}
