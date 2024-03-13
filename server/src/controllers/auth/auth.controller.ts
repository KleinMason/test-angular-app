/* istanbul ignore file */
import { Application, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { RouteError, ShamanExpressController } from "shaman-api";
import { SERVICE_TYPES } from "../../composition/app.composition.types";
import { IAuthService } from "../../services/auth/auth.service";
import { ITokenService } from "../../services/token.service";
import { IUserService } from "../../services/user.service";

@injectable()
export class AuthController implements ShamanExpressController {
  private router: Router;
  name: string = "auth";

  constructor(
    @inject(SERVICE_TYPES.AuthService) private authService: IAuthService,
    @inject(SERVICE_TYPES.UserService) private userService: IUserService,
    @inject(SERVICE_TYPES.TokenService) private tokenService: ITokenService
  ) {}

  configure = (express: Application) => {
    let router = Router();
    router.post("/", this.login);

    express.use("/api/v1/auth", router);
  };

  login = async (req: Request, res: Response, next: any) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    try {
      const isAuthenticated = await this.authService.authenticateUser(
        email,
        password
      );
      if (!isAuthenticated)
        return res.status(401).json({ message: "Invalid email or password" });
      const userId = await this.userService.getUserIdForEmail(email);
      const jwtBearerToken = this.tokenService.getBearerTokenForUserId(userId);
      return res.cookie("SESSIONID", jwtBearerToken, {
        httpOnly: true
        // secure: true
        // TODO: ☝️ Uncomment the above line when using HTTPS
      });
    } catch (err) {
      return next(new RouteError(err.message, 500));
    }
  };
}
